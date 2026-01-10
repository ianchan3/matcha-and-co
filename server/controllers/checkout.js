import stripe from "../config/stripe.js";
import mongoose from 'mongoose';


export async function create (req, res) {
  try {
    const { cart } = req.body;

    // variable called cart stores the values from the request

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

    console.log("CLIENT_URL =", process.env.CLIENT_URL);
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items,
      success_url: `${process.env.CLIENT_URL}/success`,
      cancel_url: `${process.env.CLIENT_URL}/menu`,
    });

    return res.json({ url: session.url });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create checkout session" });
  }
};