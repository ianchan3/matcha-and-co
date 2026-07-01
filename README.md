# Matcha & Co. — Online Ordering App

A full-stack food ordering web app built with React, Node.js/Express, and MongoDB. Customers can browse the menu, add items to cart, and check out via Stripe. Orders trigger Slack notifications to the restaurant.

**Live:** [matcha-and-co.com](https://matcha-and-co.com)

---

## Tech Stack

- **Frontend:** React, Vite, React Router
- **Backend:** Node.js, Express
- **Database:** MongoDB (Mongoose)
- **Payments:** Stripe (Checkout + Webhooks)
- **Auth:** Google OAuth (Passport.js)
- **Observability:** OpenTelemetry → Grafana Cloud (Metrics, Traces, Logs)
- **Notifications:** Slack Webhooks
- **Testing:** Vitest, Supertest, Playwright E2E
- **CI/CD:** GitHub Actions
- **Hosting:** Vercel (frontend), Render (backend)

---

## Features

- Menu browsing with cart (add, remove, quantity controls, persistence)
- Stripe checkout with success page and order confirmation
- Google OAuth login
- Slack notifications for new orders
- Contact form
- Grafana alerting for checkout failures

---

## Local Development

### Prerequisites

- Node.js
- MongoDB
- Stripe account
- Google OAuth credentials
- Slack webhook URL

### Setup

1. Clone the repo
2. Install frontend dependencies:
   ```bash
   npm install
   ```
3. Install backend dependencies:
   ```bash
   cd server && npm install
   ```
4. Create `server/.env` with the following variables:
   ```
   MONGODB_URI=
   STRIPE_SECRET_KEY=
   STRIPE_WEBHOOK_SECRET=
   SLACK_WEBHOOK_URL=
   GOOGLE_CLIENT_ID=
   GOOGLE_CLIENT_SECRET=
   SESSION_SECRET=
   FRONTEND_URL=http://localhost:5173
   NODE_ENV=development
   ```
5. Start the backend:
   ```bash
   cd server && npm run dev
   ```
6. Start the frontend:
   ```bash
   npm run dev
   ```
