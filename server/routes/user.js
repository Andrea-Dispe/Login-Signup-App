const router = require('express').Router();
const userController = require('../controllers/userController');
const middlewares = require('../middlewares/middlewares')

router.post('/get-username', userController.getUsername)


module.exports = router;
