const { body } = require('express-validator');

const requestPasswordReset =  [
  body('email', 'The field cannot be empty').not().isEmpty().trim().escape().normalizeEmail(),
];

module.exports = requestPasswordReset