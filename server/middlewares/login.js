const { body } = require('express-validator');

const login =  [
  body('username', 'The username field cannot be empty').not().isEmpty().trim().escape().normalizeEmail(),
  body('password', 'The password field cannot be empty').not().isEmpty().trim(),
];

module.exports = login