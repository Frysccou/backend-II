const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  age: { type: Number, required: true },
  password: { type: String, required: true },
  cart: { type: mongoose.Schema.Types.ObjectId, ref: 'Cart' },
  role: { type: String, default: 'user' },
});

// Middleware para encriptar la contraseña antes de guardar
userSchema.pre('save', function (next) {
  if (!this.isModified('password')) return next();
  try {
    // Encriptar la contraseña de manera sincrónica
    this.password = bcrypt.hashSync(this.password, 10); // Encripta la contraseña de forma sincr..
    next();
  } catch (error) {
    next(error);
  }
});

// Metodo para comparar contraseñas en el login
userSchema.methods.isValidPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;