const express = require('express');
const router = express.Router();
var { nanoid } = require('nanoid');

//Load URL model
const URL = require('../../models/Urls');

// @route GET  /api/shorten/test
// @desc Test API End Point
// @access Public

router.get('/test', (req, res) => res.json({ msg: 'API is working' }));

// @route POST api/shorten
// @desc POST a URL to shorten
// @access Public

router.post('/', (req, res) => {
  if (req.body.url) {
    urlData = req.body.url;
  }
  console.log('URL is', urlData);
  // Check if the URL already exists
  URL.findOne({ url: urlData }, (err, doc) => {
    if (doc) {
      console.log(doc);
      res.send({
        status: 200,
        url: doc.url,
        hash: doc._id,
        statusText: 'URL Already Exists',
      });
    } else {
      console.log('This is new URL');
      const webAddress = new URL({
        _id: nanoid(5),
        url: urlData,
      });
      webAddress.save((err) => {
        if (err) {
          return console.error(err);
        }
        res.send({
          url: urlData,
          hash: webAddress._id,
          status: 200,
          statusText: 'OK',
        });
      });
    }
  });
});
module.exports = router;
