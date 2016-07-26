var express = require('express');
var router = express.Router();

var isAuthenticated = function (req,res,next) { 
    if (req.isAuthenticated()) return next(); 
    res.redirect('/login');
}

/* GET home page. */
router.get('/', isAuthenticated , function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
