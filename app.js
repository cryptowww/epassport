var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
// ref express-session middleware
var session = require('express-session');
// ref passport middleware
var passport = require('passport');
var app = express();

// enable session
app.use(session({secret: 'blog.fens.me', cookie: { maxAge: 60000 }}));
app.use(passport.initialize());
app.use(passport.session());
LocalStrategy = require('passport-local').Strategy;
// enable local auth
passport.use('local', new LocalStrategy(
    function (username, password, done) {
        var user = {
            id: '1',
            username: 'admin',
            password: 'pass'
        }; // here you can set up a db auth.
        console.log(username)
        console.log(password)
        if (username !== user.username) {
            return done(null, false, { message: 'Incorrect username.' });
        }
        if (password !== user.password) {
            return done(null, false, { message: 'Incorrect password.' });
        }

        return done(null, user);
    }
));

// enable github strategy
GithubStrategy = require('passport-github').Strategy;
passport.use(new GithubStrategy({//the key you applied from github
    clientID: "a558ce27a352433104df",
    clientSecret: "2e588646ad13f47b74xxx049f3b",
    callbackURL: "http://localhost:3000/auth/github/callback"
},function(accessToken, refreshToken, profile, done) {
    done(null, profile);
}));

passport.serializeUser(function(user,done){
  done(null,user.username);
});

passport.deserializeUser(function(username,done){
  done(null,{username:username});
});

var routes = require('./routes/index');
var users = require('./routes/users');
var logins = require('./routes/login');
var logout = require('./routes/logout');
var github = require('./routes/github');



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/login', logins);
app.use('/logout',logout);

// github login enable
app.use('/github',github.Github);
app.get("/auth/github", passport.authenticate("github",{ scope : "email"}));

app.get('/auth/github/callback', 
  passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home. 
    res.redirect('/github');
  });


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});




// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

process.on('uncaughtException',function(err){
  if(err){
    console.log('------err----')
    console.log(err)
  }
})
// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  console.log(err.status);
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;


