const mongoose  = require('mongoose');

// //setting up the schema for the campgrounds
let campgroundSchema = mongoose.Schema({
  name: String,
  image: String,
  description: String,
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment'
    }
  ]
});
module.exports = mongoose.model('Campground', campgroundSchema);