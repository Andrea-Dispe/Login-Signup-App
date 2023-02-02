const router = require('express').Router();
const { body } = require('express-validator');
const authController = require('../controllers/authController');



router.get('/all', authController.getAll);

// express-validator will run middlewares Validators and/or Sanitizers functions
// the middlewares need to be wrapped inside an array. Chekc takes the req field as string
// as first parameter and a custom error message as second param
router.post(
  '/signup',
  [
    body('email', 'Email should be a valid email address')
      .isEmail()
      .trim()
      .normalizeEmail(),

    body('username', 'The username should be at least 4 letters')
      .isLength({ min: 4 }),

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
      .withMessage('The password is not strong enough. Please be sure that your password is at least 5 characters long, it has at least 1 lowercase letter, 1 uppercase letter, 1 number and 1 symbol. Sorry for the trouble but we really value the safety of your data.'),

    body('confirmPassword')
      .custom((value, { req }) => {
        console.log('value: ', value);
        if (value !== req.body.password) {
          throw new Error('Password confirmation does not match password');
        }
        return true;
      }),
  ],
  authController.signup
);

router.post(
  '/login',
  [
    body('username', 'The username field cannot be empty').not().isEmpty().trim().escape(),
    body('password', 'Please provide a password that is longer than 6 characters').isLength({ min: 6 }),
  ],
  authController.login
);

router.post(
  '/check-username-exists',
  authController.checkUsernameExists
);

router.post(
  '/check-email-exists',
  authController.checkEmailExists
);

module.exports = router;
