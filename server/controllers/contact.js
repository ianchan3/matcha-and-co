import { sendContactForm } from "../slack.js"

export async function create (req, res) {
  const { name, email, phone, orderNumber, message } = req.body;

if (!name || !email || !message) {
  return res.status(400).json({error: 'Name, email and message required'})
}

try {
  await sendContactForm({
    name: name,
    email: email,
    phone: phone,
    orderNumber: orderNumber,
    message: message,
  })
  res.json({success: true});
} catch (err) {
  console.log('Error Message', err.message);
  res.status(500).json({error: 'Failed to send Message'})
}
}