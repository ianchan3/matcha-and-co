import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import webhooksRoutes from './routes/webhooks.js';
import checkoutRoutes from './routes/checkout.js';
import contactRoutes from './routes/contact.js';
import ordersRoutes from './routes/orders.js';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import authRoutes from './routes/auth.js';
import passport from 'passport';
import './config/passport.js';

const app = express();
app.set('trust proxy', 1);

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
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: process.env.MONGODB_URI ? MongoStore.create({ mongoUrl: process.env.MONGODB_URI }) : undefined,
  cookie: {
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    secure: process.env.NODE_ENV === 'production' ? true : false,
    maxAge: 24 * 60 * 60 * 1000
  }
}))

app.use(passport.initialize())
app.use(passport.session())
app.use('/webhooks', webhooksRoutes);
app.use(express.json());
app.use('/auth', authRoutes);
app.use('/checkout', checkoutRoutes);
app.use('/contact', contactRoutes);
app.use('/orders', ordersRoutes);

app.get('/health', (req, res) => res.json({ status: 'ok' }));

export default app;
