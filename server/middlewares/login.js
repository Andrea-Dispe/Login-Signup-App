const {  check, oneOf } = require('express-validator');

const login = oneOf([
  check('email', 'Should be a valid email').isEmail().trim(),
  check('username', 'Should be a valid string').not().isEmpty().isString().trim().escape()
])

// const login =  [
//   body('username', 'The username field cannot be empty').not().isEmpty().trim().escape(),
//   body('email', 'Email should be a valid email address').isEmail().trim(),
//   body('password', 'The password field cannot be empty').not().isEmpty().trim(),
// ];

module.exports = login