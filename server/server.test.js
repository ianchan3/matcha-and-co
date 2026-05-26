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