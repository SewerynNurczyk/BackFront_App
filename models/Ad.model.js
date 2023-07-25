const mongoose = require('mongoose');

const adSchema = new mongoose.Schema({
  title: { type: String, require: true },
  description: { type: String, require: true },
  pubDate: { type: Date, require: true },
  image: { type: String, require: true },
  price: { type: Number, require: true },
  location: { type: String, require: true },
  user: { type: String, require: true }
});

module.exports = mongoose.model('Ad', adSchema);