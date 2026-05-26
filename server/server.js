import 'dotenv/config';
import mongoose from 'mongoose';
import app from './app.js';

await mongoose.connect(process.env.MONGODB_URI);
console.log('Mongo connected');

const PORT = process.env.PORT || 4242;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
