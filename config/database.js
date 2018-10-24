// set up mongoose connection
const mongoose = require('mongoose');
const mongoDB = 'mongodb://ilham:ilham2140@ds040309.mlab.com:40309/nowplaying';

mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;

module.exports = mongoose;
