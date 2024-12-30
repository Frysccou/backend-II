export const ensureRole = (role) => (req, res, next) => {
  if (req.user.role !== role) {
    return res.status(403).send({ message: 'Acceso denegado' });
  }
  next();
};