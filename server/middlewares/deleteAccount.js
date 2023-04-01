const { body } = require('express-validator');

const deleteAccount =  [
  body('email', 'The username field cannot be empty').not().isEmpty().trim().escape().normalizeEmail(),
];

module.exports = deleteAccount