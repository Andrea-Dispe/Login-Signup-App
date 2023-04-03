const signup = require('./signup');
const login = require('./login');
const requestPasswordReset = require('./requestPasswordReset');
const checkAuth = require('./checkAuth');



module.exports = {
  signup,
  login,
  requestPasswordReset,
  checkAuth
}