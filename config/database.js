const mongoose  = require('mongoose');

let initDatabase = function() {
  let dbUri = process.env.DB_URI;
  mongoose.connect(dbUri);
  let connection = mongoose.connection;

  connection.on('connected', function() {
    console.log('Successfully connected to the database: '+ dbUri);
  });
  connection.on('error', function(err) {
    console.log('Error Occured while connecting to the database');
    console.log(err);
  });
  connection.on('disconnected', function(){
    console.log('Database Disconnected!');
  });
}

module.exports = initDatabase;