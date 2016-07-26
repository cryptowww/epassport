var express = require('express');
var router = express.Router();

var isAuthenticated = function (req,res,next) { 
    if (req.isAuthenticated()) return next(); 
    res.redirect('/login');
}

/* GET users listing. */
router.get('/', isAuthenticated, function(req, res, next) {
	var html = "<h2>Hi, " + req.user.username + "</h2><p><a href='/logout'>LogOut Now</a></p><p><a href='/github'>github page</a></p><p><a href='/'>Home page</a></p>";
	res.send(html);
 	//res.send('respond with a resource');
});

module.exports = router;
