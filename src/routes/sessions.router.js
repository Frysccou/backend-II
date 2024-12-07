const express = require('express');
const { login, register } = require('../controllers/sessions.controller');
const router = express.Router();
const passport = require('passport');

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

module.exports = router;