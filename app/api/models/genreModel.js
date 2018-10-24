const mongoose = require('mongoose');

// Define a Schema
const Schema = mongoose.Schema;

const GenreSchema = new Schema({
  genre: {
    type: String,
    trim: true,
    required: true
  }
});

module.exports = mongoose.model('Genre', GenreSchema);
