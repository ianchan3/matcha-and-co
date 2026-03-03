import mongoose from "mongoose";

const CartItemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    priceCents: { type: Number, required: true, min: 0 },
    qty: { type: Number, required: true, min: 1 },
  },
  { _id: false }
);

const CheckoutAttemptSchema = new mongoose.Schema(
  {
    stripeSessionId: { type: String, required: true, unique: true, index: true },
    cart: { type: [CartItemSchema], required: true },
    status: { type: String, enum: ["pending", "succeeded", "failed"], default: "pending" },
  },
  { timestamps: true }
);

export default mongoose.model("CheckoutAttempt", CheckoutAttemptSchema);
