const mongoose = require('mongoose');
const urlSchema = new mongoose.Schema({
  _id: { type: String },
  url: {
    type: String,
    required: true,
  },

  hash: { type: String },

  date: { type: String, default: Date.now },
});

module.exports = mongoose.model('Url', urlSchema);
