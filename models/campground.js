const mongoose  = require('mongoose');
const User = require('./user');

// //setting up the schema for the campgrounds
let campgroundSchema = mongoose.Schema({
  name: String,
  image: String,
  description: String,
  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: User
    },
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment'
    }
  ]
});
module.exports = mongoose.model('Campground', campgroundSchema);