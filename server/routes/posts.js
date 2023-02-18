



const router = require('express').Router();
const  {publicPosts, privatePosts} = require('../config/db')
const checkAuth = require('../middlewares/checkAuth')

router.get('/public', (req, res) => {
  res.json(publicPosts)
})

// protected route
router.get('/private', checkAuth, (req, res) => {
  res.json(privatePosts)
})





module.exports = router;
