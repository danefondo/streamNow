const passport = require('passport');
const jwt = require('jsonwebtoken');

const ensureAuthenticated = passport.authenticate('jwt', { session: false });

const checkAuthenticated = (req, res, next) => {
  const { authorization } = req.headers;
  if (authorization && !authorization.includes('null')) {
    const token = req.headers.authorization.split('Bearer ')[1];
    const decoded = jwt.verify(token, process.env.SECRET)
    if (decoded.user) {
      req.user = decoded.user;
    }
  }
  next();
}

module.exports = {
    ensureAuthenticated,
    checkAuthenticated,
}