const bcrypt = require('bcrypt');
const User = require('../models/user.model');
const jwt = require('jsonwebtoken');

// Controlador para el login
const login = async (req, res) => {
  const { email, password } = req.body;

  // logs de depuracion
  console.log('Contraseña recibida:', password);

  try {
    // Buscar al usuario por email
    const user = await User.findOne({ email });

    // Verificar si el usuario existe
    if (!user) {
      return res.status(400).send('Usuario no encontrado');
    }

    // Mostrar el hash de la contraseña almacenada en la db
    console.log('Contraseña almacenada en la db:', user.password);

    // Comparar la contraseña ingresada con la almacenada
    const isMatch = bcrypt.compare(password, user.password);

    // Si no coinciden, dar error
    if (!isMatch) {
      return res.status(400).send('Contraseña incorrecta');
    }

    // Si la contraseña es correcta tira mensaje de login exitoso
    console.log('Login exitoso');

    // Crear el payload para el JWT
    const payload = { _id: user._id };

    // Firmar el token JWT
    const token = jwt.sign(payload, 'queonda', { expiresIn: '1h' });

    // Establecer el token en la cookie
    res.cookie('jwt', token, { 
      httpOnly: true, 
      secure: process.env.NODE_ENV === 'production',
      maxAge: 3600000 // 1 hora
    });

    // Responder con el token en el cuerpo de la respuesta
    res.json({ token, message: 'Login exitoso' });

  } catch (err) {
    console.error('Error en login:', err);
    res.status(500).send('Error en el servidor');
  }
};

// Controlador para registrar usuario
const register = async (req, res) => {
  const { first_name, last_name, email, age, password } = req.body;

  try {
    // Verificar que todos los campos estan presentes
    if (!first_name || !last_name || !email || !age || !password) {
      return res.status(400).send('Todos los campos son obligatorios');
    }

    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send('El email ya esta registrado');
    }

    // Hashear la contraseña sincrónicamente
    const hashedPassword = bcrypt.hashSync(password, 10);
    console.log('Contraseña hasheada:', hashedPassword);

    // Crear el nuevo usuario
    const newUser = new User({
      first_name,
      last_name,
      email,
      age,
      password: hashedPassword,
    });

    // Guardar el nuevo usuario en la base de datos
    await newUser.save();

    res.status(201).send('Usuario registrado exitosamente');
  } catch (err) {
    console.error('Error al registrar usuario:', err);
    res.status(500).send('Error al registrar usuario');
  }
};

module.exports = { login, register };