import express from 'express';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import sessionsRouter from './routes/sessions.router.js';
import './config/mongo.js';

const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());

// Rutas
app.use('/api/sessions', sessionsRouter);

export default app;