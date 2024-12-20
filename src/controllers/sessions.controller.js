import bcrypt from 'bcrypt';
import User from '../models/user.model.js';
import { generateToken } from '../utils/token.js';

// Controlador para el login
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Buscar al usuario por email
    const user = await User.findOne({ email });

    // Verificar si el usuario existe
    if (!user) {
      return res.status(400).send('Usuario no encontrado');
    }

    // Comparar la contraseña ingresada con la almacenada
    const isMatch = bcrypt.compare(password, user.password);

    // Si no coinciden, dar error
    if (!isMatch) {
      return res.status(400).send('Contraseña incorrecta');
    }

    // Crear el payload para el JWT
    const payload = { _id: user._id };

    // Generar el token JWT usando la función de utilidades
    const token = generateToken(payload);

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