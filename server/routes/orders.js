import express from 'express';
import { getOrderHistory } from '../controllers/orders.js';

const router = express.Router();

router.get('/', getOrderHistory);

export default router;