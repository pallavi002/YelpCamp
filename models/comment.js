const mongoose  = require('mongoose');
const User = require('./user');

let commentSchema = mongoose.Schema({
  text: String,
  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: User
    },
    username: String
  }
});
module.exports = mongoose.model('Comment', commentSchema);