import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI)
  .then(() => console.log('Conectado al MongoDB'))
  .catch((err) => console.error('Error al conectar al MongoDB:', err));

export default mongoose;