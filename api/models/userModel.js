const mongoose = require('mongoose');
const sha1 = require('js-sha1');

// Define a schema
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    trim: true,
    required: true
  },
  name: {
    type: String,
    trim: true,
    required: false
  },
  password: {
    type: String,
    trim: true,
    required: true
  },
  photo: {
    type: String,
    trim: true,
    required: true
  }
});

// hash user password before saving into database
UserSchema.pre('save', function(next) {
  this.password = sha1(this.password);
  next();
});

module.exports = mongoose.model('User', UserSchema);
