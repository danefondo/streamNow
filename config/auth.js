const passport = require('passport');
const jwt = require('jsonwebtoken');

const ensureAuthenticated = passport.authenticate('jwt', { session: false });

const checkAuthenticated = (req, res, next) => {
  if (req.headers.authorization) {
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