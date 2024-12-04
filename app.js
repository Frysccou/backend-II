const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const passport = require('./src/config/passport');
const sessionsRouter = require('./src/routes/sessions.router');

const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());

// Rutas
app.use('/api/sessions', sessionsRouter);

// Conexion al super MongoDB
const MONGO_URI = 'mongodb+srv://fhrisco:1234@backend-ii.pohsy.mongodb.net/?retryWrites=true&w=majority&appName=backend-II';

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conectado al MongoDB Atlas'))
  .catch((err) => console.error('Error al conectar al MongoDB:', err));

module.exports = app;