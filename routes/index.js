const express = require('express');
const router = express.Router();
const passport = require('passport');

const User = require('../models/user');

//root route
router.get('/', function (req, res, next) {
  res.redirect('campgrounds');
});

//register route
router.get('/register', function(req, res) {
  res.render('register')
})
router.post('/register', function(req, res) {
  var newUser = new User({ username: req.body.username });
  User.register(newUser, req.body.password, function(err, user) {
    if(err) {
      console.log(err);
      return res.render('register')
    } else {
      passport.authenticate('local')(req,res, function() {
        console.log('user registered successfully!!');
        res.redirect('/campgrounds');
      })
    }
  })
})
//show login form
router.get('/login', function(req, res) {
  res.render('login')
})
router.post('/login', passport.authenticate('local', 
  {
    successRedirect:'/campgrounds',
    failureRedirect: '/login'
  })
)

//logout
router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/campgrounds');
})

//middleware
function isLoggedIn(req, res ,next) {
  if(req.isAuthenticated()) {
    return next();
  } 
  res.redirect('/login');
}

module.exports = router;