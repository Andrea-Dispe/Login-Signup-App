const signup = require('./signup');
const login = require('./login');
const requestPasswordReset = require('./requestPasswordReset');
const deleteAccount = require('./deleteAccount');


module.exports = {
  signup,
  login,
  requestPasswordReset,
  deleteAccount
}