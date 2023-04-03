const router = require('express').Router();
const userController = require('../controllers/userController');
const middlewares = require('../middlewares/middlewares')

router.post('/get-username', middlewares.checkAuth, userController.getUsername)

router.post('/delete-account', middlewares.checkAuth, userController.deleteAccount)



module.exports = router;
