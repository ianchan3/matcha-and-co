const SLACK_WEBHOOK_URL = process.env.SLACK_WEBHOOK_URL

export async function sendOrderNotfications(order) {
  if (!SLACK_WEBHOOK_URL) return;

  const itemLines = order.items.map(item => `• ${item.qty}× ${item.name} — $${(item.priceCents * item.qty / 100).toFixed(2)}`).join('\n');

    const total = `$${(order.amountTotalCents / 100).toFixed(2)}`;

    const ref = order.paymentIntentId.slice(-8).toUpperCase();

    const body = {
      text: `🛒 *New Order #${ref}*\n${itemLines}\n*Total: ${total}*`,
    };

    try {
      await fetch(SLACK_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(body),
      });
    } catch (err) {
      console.error('Slack Notification failed', err.message);
    }
}