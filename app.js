const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local')
const initDatabase = require('./config/database');
require('dotenv').config();
const mongoose = require('mongoose');

const User = require('./models/user');
const SeedDB = require('./seeds')
var commentRoutes = require('./routes/comments');
var campgroundRoutes = require('./routes/campgrounds');
var indexRoutes = require('./routes/index');

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

initDatabase();
//seed the database
// SeedDB();

//PASSPORT CONFIGURATION
app.use(require('express-session') ({
  secret: "This is some secret string",
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next) {
  res.locals.currentUser = req.user;
  next();
})
// campgrounds.forEach(campground => {
//   Campground.create({
//     name: campground.name,
//     image: campground.image
//   }, function(err, res){
//     if(err) {
//       console.log('Cannot create');
//       console.log(err);
//     } else {
//       console.log('Successfully added campground..');
//     }
//   })
// });

app.use('/',indexRoutes);
app.use('/campgrounds/:id/comments',commentRoutes);
app.use('/campgrounds', campgroundRoutes);

app.listen('3005', function () {
  console.log('YelpCamp Server Running on port 3005...');
});