var express = require('express');
var router = express.Router();

var isAuthenticated = function (req,res,next) { 
    if (req.isAuthenticated()) return next(); 
    res.redirect('/login');
}

/* GET users listing. */
router.get('/', isAuthenticated, function(req, res, next) {
	var html = "<h2>Hi, " + req.user.username + "</h2><a href='/logout'>LogOut Now</a>";
	res.send(html);
 	//res.send('respond with a resource');
});

module.exports = router;
