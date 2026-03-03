import stripe from "../config/stripe.js";
import CheckoutAttempt from "../model/CheckoutAttempt.js";
import "dotenv/config";


export async function create (req, res) {
  try {
    const { cart } = req.body;

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
      success_url: `${process.env.FRONTEND_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/menu`,
    });

    await CheckoutAttempt.create({
      stripeSessionId: session.id,
      cart,
      status: "pending",
    });

    return res.json({ url: session.url, sessionId: session.id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create checkout session" });
  }
};