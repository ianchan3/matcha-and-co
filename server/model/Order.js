import mongoose from "mongoose";

const OrderItemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    priceCents: { type: Number, required: true },
    qty: { type: Number, required: true },
  },
  { _id: false }
);

const OrderSchema = new mongoose.Schema(
  {
    stripeSessionId: { type: String, required: true, unique: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    paymentIntentId: { type: String },
    receiptNumber: {type: String},
    customerName: {type: String},
    items: { type: [OrderItemSchema], required: true },
    amountTotalCents: { type: Number, required: true },
    currency: { type: String, default: "usd" },
    status: { type: String, enum: ["paid", "refunded"], default: "paid" },
  },
  { timestamps: true }
);

export default mongoose.model("Order", OrderSchema);