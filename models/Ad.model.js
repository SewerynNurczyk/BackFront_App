const mongoose = require('mongoose');

const adsSchema = new mongoose.Schema({
  title: { type: String, require: true },
  description: { type: String, require: true },
  pubDate: { type: Date, require: true },
  image: { type: String, require: true },
  price: { type: Number, require: true },
  location: { type: String, require: true },
  user: { type: String, require: true, ref: 'User' }
});

module.exports = mongoose.model('Ads', adsSchema);