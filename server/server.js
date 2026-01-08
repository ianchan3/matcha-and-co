import express from "express";
import cors from "cors";
import Stripe from "stripe";
import dotenv from "dotenv";

dotenv.config();

console.log("Has Stripe key:", process.env.STRIPE_SECRET_KEY?.startsWith("sk_test_"));

const app = express();
app.use(cors({ origin: ["http://localhost:5173", "http://localhost:5174"], methods: ["GET","POST"], allowedHeaders: ["Content-Type"] }));
app.use(express.json());

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

app.get("/health", (req, res) => res.send("ok"));

app.post("/checkout", async (req, res) => {
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

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items,
      success_url: `${process.env.CLIENT_URL}/success`,
      cancel_url: `${process.env.CLIENT_URL}/menu`,
    });

    res.json({ url: session.url });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create checkout session" });
  }
});

app.listen(4242, "127.0.0.1", () => {
  console.log("Server running on http://127.0.0.1:4242");
});