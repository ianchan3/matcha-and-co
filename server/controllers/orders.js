import Order from '../model/Order.js';

export async function getOrderHistory (req,res) {
  if (!req.user) return res.status(401).json({ error: 'Not logged in' });
  const orders = await Order.find({userId: req.user._id}).sort({createdAt: -1}).limit(20);
  res.json(orders);

}