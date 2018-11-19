const express = require('express');
const logger = require('morgan');

// route
const user = require('./app/routes/userRoute');
const artis = require('./app/routes/artisRoute');
const genre = require('./app/routes/genreRoute');

const bodyParser = require('body-parser');
const mongoose = require('./config/database');

var jwt = require('jsonwebtoken');
const app = express();

app.set('secretKey', 'nodeRestApi'); // jwt secret token

// connection to mongodb
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,x-access-token');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.get('/', function(req, res){
 res.json({"welcome" : "Now Playing"});
});

// public route
app.use('/user', user);

app.use('/genre', genre);

// private route
// app.use('/artis', validateUser, artis);
// app.use('/genre', validateUser, genre);

app.get('/favicon.ico', function(req, res) {
  res.sendStatus(204);
});

// cek token
function validateUser(req, res, next) {
  console.log(req.headers['x-access-token']);
  jwt.verify(req.headers['x-access-token'], req.app.get('secretKey'), function(err, decoded) {
    if (err) {
      res.json({
        status: "error",
        message: "Access denied!",
        data: null
      });
    } else {
      // add user id to request
      req.body.userId = decoded.id;
      next();
    }
  });
}

// express doesn't consider not found 404 as an error so we need to handle 404 explicitly
// handel 404 error
app.use(function(req, res, next) {
  let err = new Error('Not Found!');
    err.status = 404;
    next(err);
});

// handle errors
app.use(function(err, req, res, next) {
  console.log(err);

  if (err.status === 404) {
    res.status(404).json({
      status: "error",
      message: err.message
    });
  } else {
    res.status(500).json({
      status: "error",
      message: err.message
    });
  }
});

app.listen(96, function(){
  console.log('Node server listening on port 96');
});
