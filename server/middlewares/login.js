const { body } = require('express-validator');

const login =  [
  body('username', 'The username field cannot be empty').not().isEmpty().trim().escape(),
  body('password', 'Please provide a password that is longer than 3 characters').isLength({ min: 6 }),
];

module.exports = login