var express = require('express');
var router = express.Router();
var passport = require('passport')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Express' });
});
// redirect to home page when success,or redirect to login page when failure
router.post('/', passport.authenticate('local', { successRedirect: 'http://localhost:3000', failureRedirect: '/login' }));

module.exports = router;
