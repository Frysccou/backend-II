import jwt from 'jsonwebtoken';

const secretKey = 'queonda';

export const generateToken = (payload) => {
  return jwt.sign(payload, secretKey, { expiresIn: '1h' });
};