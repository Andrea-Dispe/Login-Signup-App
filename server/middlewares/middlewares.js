const signup = require('./signup');
const login = require('./login');
const passwordResetRequest = require('./passwordResetRequest');
const checkAuth = require('./checkAuth');



module.exports = {
  signup,
  login,
  passwordResetRequest,
  checkAuth,
}