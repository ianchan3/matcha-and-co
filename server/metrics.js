import { metrics } from '@opentelemetry/api';


// Creates a meter to measure things, like a ruler and restaurant order is the name of the ruler
const meter = metrics.getMeter('restaurant-order');

export const ENV_LABEL = { environment: process.env.NODE_ENV || 'development' };

export const checkoutAttempts = meter.createCounter('checkout_attempts_total', {
  description: 'Total number of checkout attempts',
});

export const checkoutSuccesses = meter.createCounter('checkout_successes_total', {
  description: 'Checkout sessions successfully created with Stripe',
});

export const checkoutFailures = meter.createCounter('checkout_failures_total', {
  description: 'Checkout attempts that resulted in a server error',
});

export const webhookEvents = meter.createCounter('webhook_events_total', {
  description: 'Stripe webhook events received',
});

export const webhookFailures = meter.createCounter('webhook_failures_total', {
  description: 'Stripe webhook events that failed processing',
});
