import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import UserRepository from '../dao/repositories/user.repository.js';
import CartDAO from '../dao/daos/cart.dao.js';
import { generateToken } from '../utils/token.js';
import { UserDTO } from '../dtos/user.dto.js';

dotenv.config();

// Controlador para el login
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserRepository.findByEmail(email);

    if (!user) {
      return res.status(400).send('Usuario no encontrado');
    }

    const isMatch = bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).send('Contraseña incorrecta');
    }

    const payload = { _id: user._id };
    const token = generateToken(payload);

    res.cookie('jwt', token, { 
      httpOnly: true, 
      secure: process.env.NODE_ENV === 'production',
      maxAge: 3600000 // 1 hora
    });

    res.json({ token, message: 'Login exitoso' });

  } catch (err) {
    console.error('Error en login:', err);
    res.status(500).send('Error en el servidor');
  }
};

// Controlador para registrar usuario
export const register = async (req, res) => {
  const { first_name, last_name, email, age, password, role } = req.body;

  try {
    const existingUser = await UserRepository.findByEmail(email);
    if (existingUser) {
      return res.status(400).send('El email ya esta registrado');
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = await UserRepository.create({
      first_name,
      last_name,
      email,
      age,
      password: hashedPassword,
      role: role || 'user' // Asignar rol, por defecto es un user, pero generalmente al crear, se elige
    });

    // Crear un carrito para el usuario recién registrado
    const newCart = await CartDAO.create({ userId: newUser._id, products: [] });

    // Asignar el carrito al usuario
    newUser.cart = newCart._id;
    await newUser.save();

    res.status(201).send('Usuario registrado exitosamente');
  } catch (err) {
    console.error('Error al registrar usuario:', err);
    res.status(500).send('Error al registrar usuario');
  }
};

// Controlador para obtener el usuario actual
export const getCurrentUser = (req, res) => {
  const userDTO = new UserDTO(req.user);
  res.json(userDTO);
};