const mongoose = require('mongoose');

const connectToDB = () => {
  // connect to DB
  const NODE_ENV = process.env.NODE_ENV;
  let dbUri = '';

  if (NODE_ENV === 'production') dbUri = `mongodb+srv://snurczyk99:${process.env.DB_PASS}@cluster0.fin2lpx.mongodb.net/db?retryWrites=true&w=majority`;

  else dbUri = 'mongodb://localhost:27017/InfoBoard';

  mongoose.connect(dbUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const db = mongoose.connection;

  // on success
  db.once('open', () => {
    console.log('Connected to the database');
  });

  // on error
  db.on('error', (err) => console.log('Error ' + err));

  return db
};

module.exports = connectToDB;