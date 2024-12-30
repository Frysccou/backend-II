import express from 'express';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import sessionsRouter from './routes/sessions.router.js';
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';
import './config/mongo.js';

try {
    await import('./config/passport.js');
    console.log('Passport esta bien configurado....');
} catch (error) {
    console.error('Error al configurar passport:', error);
} // Por las dudas lo dejo, porque me surgieron problemitas con esto

const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());

// Rutas
app.use('/api/sessions', sessionsRouter);
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

export default app;