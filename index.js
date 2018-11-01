// Run in debug mode by `DEBUG=app nodemon index.js`
// Use debug() in place of console.log
const debug = require('debug')('app')
const express = require('express');
const morgan = require('morgan') // logs http requests
const app = express();
const genres = require('./routes/genres');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/vidly', { useNewUrlParser: true })
  .then(() => debug('Connected to mongodb...'))
  .catch(err => console.error('Could not connect to MongoDb...', err))

// app.get defaults to development if not set
if (app.get('env') === 'development') {
  app.use(morgan('tiny'));
  debug('Morgan enabled....')
}

app.use(express.json());
app.use(express.static('public'));
app.use('/api/genres', genres)





// PORT
const port = process.env.PORT || 4000
app.listen(port, () => console.log(`Listening on ${port}`))