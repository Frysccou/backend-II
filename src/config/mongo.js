const mongoose = require('mongoose');
require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI)
  .then(() => console.log('Conectado al MongoDB Atlas'))
  .catch((err) => console.error('Error al conectar al MongoDB:', err));

module.exports = mongoose;