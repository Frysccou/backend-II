import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  email: {type: String, unique: true},
  age: Number,
  password: String,
  role: {type: String, default: 'user'},
  cart: { type: mongoose.Schema.Types.ObjectId, ref: 'Cart' },
})

// Middleware para encriptar la contraseña antes de guardar
userSchema.pre('save', function (next) {
  if (!this.isModified('password')) return next();
  try {
    // Encriptar la contraseña de manera sincronica
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

export default User;