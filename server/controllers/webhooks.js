import stripe from "../config/stripe.js";
import CheckoutAttempt from "../model/CheckoutAttempt.js";
import Order from "../model/Order.js";
import { webhookEvents, webhookFailures } from "../metrics.js";


export async function stripeWebhook(req, res) {

  const sig = req.headers["stripe-signature"];

//   Stripe includes a special header called stripe-signature.
// This is used to prove the request actually came from Stripe (security)

let event;

try {
  event = stripe.webhooks.constructEvent(
    req.body, // raw Buffer from express.raw()
    sig,
    process.env.STRIPE_WEBHOOK_SECRET
  );
  webhookEvents.add(1, { 'event.type': event.type});
//   If the signature doesn’t match, Stripe is not trusted → it throws an error.
// If it succeeds, you get a real Stripe event object.

} catch (err) {
  console.error("❌ Webhook signature verification failed:", err.message);
  webhookFailures.add(1);
  return res.status(400).send(`Webhook Error: ${err.message}`);
}

if (event.type === "checkout.session.completed") {
  const session = event.data.object;
  try {

    const attempt = await CheckoutAttempt.findOne({ stripeSessionId: session.id });
    if (!attempt) {
      console.error("⚠️ No CheckoutAttempt found for session:", session.id);
      return res.status(200).send("ok"); // don't trigger retries storm
    }


// make sure there's no matching record in the MongoDB Order Document

    const existing = await Order.findOne({ stripeSessionId: session.id });
    if (!existing) {
      await Order.create({
        stripeSessionId: session.id,
        paymentIntentId: session.payment_intent,
        items: attempt.cart,
        amountTotalCents: session.amount_total ?? 0,
        currency: session.currency ?? "usd",
        status: "paid",
      });
    }

    await CheckoutAttempt.updateOne(
      { _id: attempt._id },
      { $set: { status: "succeeded" } }
    );

    console.log("✅ Order created/confirmed for session:", session.id);
  } catch (err) {
    console.error("❌ Webhook handler failed:", err);
    webhookFailures.add(1);
    return res.status(500).send("Webhook handler failed");
  }
}

return res.status(200).send("ok");


}