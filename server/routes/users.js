var express = require('express');
var router = express.Router();

// require contoller
const usersController = require('../controllers/users');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/signup', usersController.signup)
router.post('/signin', usersController.signin)

module.exports = router;
