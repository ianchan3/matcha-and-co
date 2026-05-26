import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import webhooksRoutes from './routes/webhooks.js';
import checkoutRoutes from './routes/checkout.js';

const app = express();

const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(
  cors({
    origin(origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      if (origin.endsWith('.vercel.app')) return callback(null, true);
      return callback(new Error('Not allowed by CORS'));
    },
    credentials: false,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

app.use('/webhooks', webhooksRoutes);
app.use(express.json());
app.use('/checkout', checkoutRoutes);

app.get('/health', (req, res) => res.json({ status: 'ok' }));

export default app;
