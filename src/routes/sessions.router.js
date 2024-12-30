import express from 'express';
import { login, register, getCurrentUser } from '../controllers/sessions.controller.js';
import passport from 'passport';

const router = express.Router();

// Ruta de login
router.post('/login', login);

// Ruta de registro
router.post('/register', register);

// Ruta para obtener el usuario actual
router.get('/current', passport.authenticate('jwt', { session: false }), getCurrentUser);

export default router;