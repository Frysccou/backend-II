export const ensureRole = (...roles) => (req, res, next) => {
  if (req.user && (req.user.role === 'admin' || roles.include(req.user.role))) {
    return next();
  }
  return res.status(403).send({message: 'Acceso denegado'});
};