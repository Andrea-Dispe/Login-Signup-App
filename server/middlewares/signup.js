const { body } = require('express-validator');

const signup = [
  body('email', 'Email should be a valid email address')
    .isEmail()
    .trim()
    .normalizeEmail(),

  body('username', 'The username should be at least 4 letters')
    .isLength({ min: 4 })
    .trim(),

  body('password')
    .isStrongPassword({
      minLength: 5,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
      returnScore: false,
      pointsPerUnique: 1,
      pointsPerRepeat: 0.5,
      pointsForContainingLower: 10,
      pointsForContainingUpper: 10,
      pointsForContainingNumber: 10,
      pointsForContainingSymbol: 10,
    })
    .withMessage('The password is not strong enough. Please be sure that your password is at least 5 characters long, it has at least 1 lowercase letter, 1 uppercase letter, 1 number and 1 symbol. Sorry for the trouble but we really value the safety of your data.')
    .trim(),

  body('confirmPassword')
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Password confirmation does not match password');
      }
      return true;
    }),
];

module.exports = signup