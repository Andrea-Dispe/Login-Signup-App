const { body } = require('express-validator');

const passwordResetRequest =  [
  body('email', 'The field cannot be empty').not().isEmpty().trim().escape(),
];

module.exports = passwordResetRequest