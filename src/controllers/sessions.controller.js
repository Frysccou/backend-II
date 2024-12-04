const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const bcrypt = require('bcrypt');

// Controlador para el login
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Encuentra al usuario por email
    const user = await User.findOne({ email });
    if (!user) return res.status(400).send('Usuario no encontrado');

    // Compara la contraseña
    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) return res.status(400).send('Contraseña incorrecta');

    // Crea el token JWT
    const payload = { _id: user._id };
    const token = jwt.sign(payload, 'queonda', { expiresIn: '1h' });

    res.json({ token });
  } catch (err) {
    res.status(500).send('Error en el servidor');
  }
};

// Controlador para tener los datos del usuario con el token
const current = (req, res) => {
  res.json(req.user);
};

module.exports = { login, current };