import passport from 'passport';

export const authenticate = (req, res, next) => {
  passport.authenticate('jwt', {session: false }, (err, user, info) => {
    if (err || !user) {
      return res.status(401).send({ message: 'No autorizado'});
    }
    req.user = user;
    next();
  })(req, res, next);
}