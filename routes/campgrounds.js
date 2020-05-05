const express = require('express');
const router = express.Router();

const Campground = require('../models/campground');

router.get('/', function (req, res) {
  Campground.find({}, function (err, results) {
    if (err) {
      console.log('Error Occured' + err);
    } else {
      console.log(results)
      res.render('campgrounds/campgrounds.ejs', {
        results: results,
        currentUser: req.user
      });
    }
  });

})

router.post('/', function (req, res) {
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

router.get('/new', function (req, res) {
  res.render('campgrounds/form.ejs');
})

router.get('/:id', function (req, res) {
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

module.exports = router;