import { describe, it, expect } from 'vitest'
import request from 'supertest'
import app from './app.js'


describe("GET /health", () => {
  it ("Testing Health API Endpoint", async () => {
    const res = await request(app).get("/health");
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('ok');
  })
})

describe("Failed Checkout Test", () => {
  it ("Testing Failed Stripe Checkout", async () => {
    const req = [{name: 'Matcha Latte', priceCents: '799', qty: 1}]
    const res = await request(app).post("/checkout").send({cart: req, origin: 'http://localhost:5143'}).set('Content-Type', 'application/json')
    expect(res.status).toBe(500);
    expect(res.body.error).toBe('Failed to create checkout session');
  }, 20000)
})