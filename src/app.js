const express = require('express');
const cookieParser = require('cookie-parser');
const passport = require('./config/passport');
const sessionsRouter = require('./routes/sessions.router');
const mongooseConnection = require('./config/mongo');

const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());

// Rutas
app.use('/api/sessions', sessionsRouter);

module.exports = app;