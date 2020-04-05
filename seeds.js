const mongoose = require('mongoose');
const Campground = require('./models/campground');
const Comment = require('./models/comment');


let data = [
  {
    name: 'Clouds rest',
    image: 'https://images.unsplash.com/photo-1565053396207-75ca17bdf99c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1400&q=60',
    description: 'The clouds are dark and resting in the sky,Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'
  },
  { 
    name: 'Desert Mesa',
    image: 'https://images.unsplash.com/photo-1477581265664-b1e27c6731a7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1296&q=60',
    description: 'The clouds are dark and resting in the sky,Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'

  },
  {
    name: 'Canyon floora',
    image: 'https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1100&q=60',
    description: 'The clouds are dark and resting in the sky,Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'
  }
]

function SeedDB() {
  //remove all campgrounds
  Campground.remove({}, function (err) {
    if (err) {
      console.log(err)
    } else {
      console.log('successfully removed');
      //add few campgrounds
      data.forEach(seed => {
        Campground.create(seed, function (err, campground) {
          if (err) {
            console.log('Cannot create');
            console.log(err);
          } else {
            console.log('Successfully added campground..');
            //create a comment
            Comment.create({
              text: 'This place is superb!!',
              author: 'Homer'
            }, function(err,comment) {
              if(err) {
                console.log(err);
              } else {
                campground.comments.push(comment);
                console.log('comment added');
                campground.save();
              }
            })
          }
        })
      });
    }
  });
}
module.exports = SeedDB;
