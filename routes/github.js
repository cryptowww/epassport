var express = require('express');
var router = express.Router();
var passport = require('passport')
/*
var isAuthenticated = function (req,res,next) { 
    if (req.isAuthenticated()) return next(); 
    res.redirect('/login');
}


router.get('/', function(req, res, next) {
	var html = "<h2>你好, " + req.user.displayName +"(" + req.user.username+")</h2>" +
        "<p>blog: <a href='/'>Home Page</a></p>" +
        "<p><a href='/logout'>退出</a></p>";
    res.send(html);
});

module.exports = router;

*/

exports.Github=function(req, res) {
	var html = "<h2>你好, " +  req.user.username+"</h2>" +
        "<p>blog: <a href='/'>Home Page</a></p>" +
        "<p><a href='/logout'>退出</a></p>";
    res.send(html);
};


exports.AuthGithub=passport.authenticate("github",{ scope : "email"});


exports.GithubCallback=passport.authenticate("github",{successRedirect: '/', failureRedirect: '/login'})