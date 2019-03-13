const mongoose = require('mongoose');

// Define a Schema
const Schema = mongoose.Schema;

const ArtisSchema = new Schema({
  genre: {
    type: Array,
    trim: true
  },
  image: {
  	type: String,
  	trim: true,
  	required: true
  },
  name: {
    type: String,
    trim: true,
    required: true
  }
});

module.exports = mongoose.model('Artis', ArtisSchema);
