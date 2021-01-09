const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
// const dotenv = require('dotenv');
// dotenv.config();
const app = express();

//body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const port = process.env.PORT || 8080;

//Load URL Models
const URL = require('./models/Urls');

//database key
const db = require('./config/keys').mongoURI;
// const db = process.env.CONNECTION_URL;
console.log(db);

mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB Connected…');
  })
  .catch((err) => console.log(err));

//Routes
const shorten = require('./routes/api/shorten');
app.use('/api/shorten', shorten);

const redirect = require('./routes/api/redirect');
app.use('/api/redirect', redirect);

app.get('/:hash', (req, res) => {
  const id = req.params.hash;
  console.log(id);
  URL.findOne({ _id: id }, (err, doc) => {
    if (doc) {
      console.log(doc);
      res.redirect(doc.url);
    } else {
      console.log(err);
      res.status(400).json({ message: 'The URL is expired' });
    }
  });
});

app.get('/', (req, res) => {
  res.send('Hello World!!!!');
});

app.listen(port, () => {
  console.log(`Server is listening at ${port}`);
});
