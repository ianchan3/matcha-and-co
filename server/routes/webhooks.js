import express from "express";
import { stripeWebhook } from "../controllers/webhooks.js";

const router = express.Router();

// IMPORTANT: Stripe needs the raw body for signature verification
router.post("/stripe", express.raw({ type: "application/json" }), stripeWebhook);

export default router;