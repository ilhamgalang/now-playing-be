const mongoose = require('mongoose');

// Define a Schema
const Schema = mongoose.Schema;

const ArtisSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: true
  },
  genre: {
    type: Array,
    trim: true,
    required: false
  }
});

module.exports = mongoose.model('Artis', ArtisSchema);
