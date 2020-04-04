const mongoose = require('mongoose');
const Campground = require('./models/campground');
const Comment = require('./models/comment');


let data = [
  {
    name: 'Clouds rest',
    image: 'https://images.unsplash.com/photo-1565053396207-75ca17bdf99c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1400&q=60',
    description: 'The clouds are dark and resting in the sky, lorem iohi woijfow wooe fkor eiwi hit edkj dbidjo odsi ehifh jvoe,he clouds are dark and resting in the sky, lorem iohi woijfow wooe fkor eiwi hit edkj dbidjo odsi ehifh jhe clouds are dark and resting in the sky, lorem iohi woijfow wooe fkor eiwi hit edkj dbidjo odsi ehifh j'
  },
  {
    name: 'Desert Mesa',
    image: 'https://images.unsplash.com/photo-1477581265664-b1e27c6731a7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1296&q=60',
    description: 'The Desert mesa hdo9w ewov in the sky, lorem iohi woijfow wooe fkor eiwi hit edkj dbidjo odsi ehifh jvoe,he clouds are dark and resting in the sky, lorem iohi woijfow wooe fkor eiwi hit edkj dbidjo odsi ehifh jhe clouds are dark and resting in the sky, lorem iohi woijfow wooe fkor eiwi hit edkj dbidjo odsi ehifh j'

  },
  {
    name: 'Canyon floora',
    image: 'https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1100&q=60',
    description: 'The canyaon cjsojc fllora are dark and resting in the sky, lorem iohi woijfow wooe fkor eiwi hit edkj dbidjo odsi ehifh jvoe,he clouds are dark and resting in the sky, lorem iohi woijfow wooe fkor eiwi hit edkj dbidjo odsi ehifh jhe clouds are dark and resting in the sky, lorem iohi woijfow wooe fkor eiwi hit edkj dbidjo odsi ehifh j'
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
