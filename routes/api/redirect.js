const express = require('express');
const router = express.Router();

//Load URL model
const URL = require('../../models/Urls');

// @route GET  /api/shorten/test
// @desc Test API End Point
// @access Public

router.get('/test', (req, res) => res.json({ msg: 'API is working' }));

// @route GET  /api/redirect
// @headers hash
// @desc Redirect User
// @access Public

router.get('/', (req, res) => {
  console.log(req.headers);
  const hash = req.headers.hash;
  console.log(hash);
  URL.findOne({ _id: hash })
    .then((doc) => {
      return res.json({
        url: doc.url,
      });
    })
    .catch((error) => {
      return res.status(400).json({
        error: 'Sorry, The link is expired.',
      });
    });
});

module.exports = router;
