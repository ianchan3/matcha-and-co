import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import checkoutRoutes from './routes/checkout.js';
import mongoose from "mongoose";

dotenv.config();

const app = express();
app.use(cors({ origin: ["http://localhost:5173", "http://localhost:5174"], methods: ["GET","POST"], allowedHeaders: ["Content-Type"] }));
app.use(express.json());


app.use('/checkout', checkoutRoutes);

await mongoose.connect(process.env.MONGODB_URI);
console.log("Mongo connected");

app.listen(4242, () => {
  console.log("Server running on http://localhost:4242");
});



