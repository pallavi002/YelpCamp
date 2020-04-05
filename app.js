const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const initDatabase = require('./config/database');
require('dotenv').config();
const mongoose = require('mongoose');

const Campground = require('./models/campground');
const Comment = require('./models/comment');
const User = require('./models/user');
const SeedDB = require('./seeds')

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

initDatabase();

SeedDB();


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

app.get('/', function (req, res, next) {
  res.render('campgrounds/index');
});

app.get('/campgrounds', function (req, res) {
  Campground.find({}, function (err, results) {
    if (err) {
      console.log('Error Occured' + err);
    } else {
      console.log(results)
      res.render('campgrounds/campgrounds.ejs', {
        results: results
      });
    }
  });

})

app.post('/campgrounds', function (req, res) {
  let name = req.body.name;
  let image = req.body.image;
  let description = req.body.description;
  let newCampground = {
    name: name,
    description: description,
    image: image
  }
  // campgrounds.push(newCampground)
  Campground.create(newCampground, function (err, res) {
    if (err) {
      console.log('Error occured while posting.');
    } else {
      console.log('Successfullt created');
    }
  });
  res.redirect('/campgrounds');
});

app.get('/campgrounds/new', function (req, res) {
  res.render('campgrounds/form.ejs');
})

app.get('/campgrounds/:id', function (req, res) {
  Campground.findById(req.params.id).populate('comments').exec(function (err, campDescription) {
    if (err) {
      console.log('Cannot find the description' + err);
    } else {
      console.log(campDescription);
      res.render('campgrounds/show', {
        campDescription: campDescription
      });
    }
  })
})

//comments routes
app.get('/campgrounds/:id/comments/new', function (req, res) {
  Campground.findById(req.params.id, function (err, campground) {
    if (err) {
      console.log(err);
    } else {
      res.render('comments/new.ejs', {
        campground: campground
      });

    }
  })
});

app.post('/campgrounds/:id/comments', function(req, res) {
  Campground.findById(req.params.id, function(err, campground) {
    if (err) {
      console.log(err);
      res.redirect('/campgrounds');
    } else {
      Comment.create(req.body.comment, function(err, comment) {
        if (err) {
          console.log(err);
          res.redirect('/campgrounds');
        } else {
          campground.comments.push(comment);
          campground.save();
          res.redirect('/campgrounds/'+ campground._id);
        }
      })
    }
  })
})

app.listen('3005', function () {
  console.log('YelpCamp Server Running on port 3005...');
});