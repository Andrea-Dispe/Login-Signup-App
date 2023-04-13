const router = require('express').Router();
const authController = require('../controllers/authController');
const middlewares = require('../middlewares/middlewares')

// express-validator will run middlewares Validators and/or Sanitizers functions
// the middlewares need to be wrapped inside an array. Chekc takes the req field as string
// as first parameter and a custom error message as second param
router.post('/signup', middlewares.signup, authController.signup);

router.post('/login', middlewares.login, authController.login);

// route from the account verficication email
router.get('/user-verify/:userId/:uniqueString', authController.verifyNewUser)

// route to landing page from account verification email
router.get('/verified', authController.verifyNewUserLandingPage)

router.post('/check-username-exists', authController.checkUsernameExists);

router.post('/check-email-exists', authController.checkEmailExists);

router.post('/password-reset-request', middlewares.passwordResetRequest, authController.passwordResetRequest)

router.post('/password-reset', authController.passwordReset)


module.exports = router;
