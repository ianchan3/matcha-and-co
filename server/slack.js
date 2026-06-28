const SLACK_WEBHOOK_URL = process.env.SLACK_WEBHOOK_URL
const SLACK_CONTACT_WEBHOOK_URL = process.env.SLACK_CONTACT_WEBHOOK_URL

export async function sendOrderNotfications(order) {
  if (!SLACK_WEBHOOK_URL) return;

  const itemLines = order.items.map(item => `• ${item.qty}× ${item.name} — $${(item.priceCents * item.qty / 100).toFixed(2)}`).join('\n');
  const total = `$${(order.amountTotalCents / 100).toFixed(2)}`;
  const ref = order.receiptNumber ?? order.stripeSessionId.slice(-8).toUpperCase();
  const name = order.customerName ?? 'Guest';

  const body = {
    text: `🛒 *New Order #${ref}* — ${name}\n${itemLines}\n*Total: ${total}*`,
  };

  try {
    const res = await fetch(SLACK_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      const text = await res.text();
      console.error('Slack rejected order notification:', res.status, text);
    }
  } catch (err) {
    console.error('Slack Notification failed', err.message);
  }
}

export async function sendContactForm(contact) {
  if (!SLACK_CONTACT_WEBHOOK_URL) return;

  const body = {
    text: `*New Inquiry from ${contact.name}* — Order #${contact.orderNumber || 'N/A'}
Contact: ${contact.email} — ${contact.phone || 'N/A'}
Message: ${contact.message}`
  }

  try {
    const res = await fetch(SLACK_CONTACT_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      const text = await res.text();
      console.error('Slack rejected contact notification:', res.status, text);
    }
  } catch (err) {
    console.log('Error Message', err.message)
  }
};
