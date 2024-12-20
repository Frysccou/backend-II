import express from 'express';
import { login, register } from '../controllers/sessions.controller.js';
import passport from 'passport';

const router = express.Router();

// Ruta de login
router.post('/login', login);

// Ruta de registro
router.post('/register', register);

// Ruta para tener los detalles del usuario actual
router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
  if (!req.user) {
    return res.status(401).send('No autenticado');
  }
  res.json({ user: req.user });
});

export default router;