import stripe from "../config/stripe.js";
import Order from "../model/Order.js";
import CheckoutAttempt from "../model/CheckoutAttempt.js";
import "dotenv/config";
import { checkoutAttempts, checkoutSuccesses, checkoutFailures } from "../metrics.js";


export async function create(req, res) {
    checkoutAttempts.add(1);
  try {
    const { cart, origin } = req.body;

    const frontendUrl = origin || process.env.FRONTEND_URL;

    // Variable called cart is created with the values from the request (name, qty, priceCents)

    if (!Array.isArray(cart) || cart.length === 0) {
      return res.status(400).json({ error: "Cart is empty" });
    }

    const line_items = cart.map((item) => ({
      price_data: {
        currency: "usd",
        unit_amount: item.priceCents,
        product_data: { name: item.name },
      },
      quantity: item.qty,
    }));

    // Variable called line_items is created. The price data object contains key values pairs matching Stripe's required data schema

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items,
      customer_creation: "always",
      success_url: `${frontendUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${frontendUrl}/menu`,
    });

    await CheckoutAttempt.create({
      stripeSessionId: session.id,
      cart,
      status: "pending",
    });

    checkoutSuccesses.add(1);
    return res.json({ url: session.url, sessionId: session.id });
  } catch (err) {
    console.error(err);
    checkoutFailures.add(1);
    res.status(500).json({ error: "Failed to create checkout session" });
  }
};

export async function getSession(req, res) {
  try {
    const { sessionId } = req.params;
    const attempt = await CheckoutAttempt.findOne({
      stripeSessionId: sessionId
    });
    if (!attempt) return res.status(404).json({ error: "Session Not Found" });
    const order = await Order.findOne({ stripeSessionId: sessionId });
    const items = order ? order.items : attempt.cart
    const amountTotalCents =
      order ? order.amountTotalCents
        :
        attempt.cart.reduce((sum, item) => sum + item.priceCents * item.qty, 0);
    return res.json({
      items,
      amountTotalCents,
      status: order ? order.status : attempt.status,
      orderRef: order ? order.paymentIntentId.slice(-8) : sessionId.slice(-8),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch session" });
  }
}