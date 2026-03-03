import express from "express";
import cors from "cors";
import "dotenv/config";
import checkoutRoutes from './routes/checkout.js';
import webhooksRoutes from "./routes/webhooks.js";
import mongoose from "mongoose";


const app = express();
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: false,
  })
);

app.use("/webhooks", webhooksRoutes);
app.use(express.json());


app.use('/checkout', checkoutRoutes);

await mongoose.connect(process.env.MONGODB_URI);
console.log("Mongo connected");

const PORT = process.env.PORT || 4242;

app.get("/health", (req, res) => res.json({ ok: true }));

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});



