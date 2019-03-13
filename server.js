const express = require('express');
const logger = require('morgan');

// route
const routeController = require('./routes');
// const user = require('./api/routes/userRoute');
// const artis = require('./api/routes/artisRoute');
// const genre = require('./api/routes/genreRoute');

const bodyParser = require('body-parser');
const mongoose = require('./config/database');

var jwt = require('jsonwebtoken');
const app = express();

var port = process.env.PORT || 3000;

app.set('secretKey', 'nodeRestApi'); // jwt secret token

// connection to mongodb
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
// Add headers
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'https://competent-haibt-616eae.netlify.com');
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
// Serving static files
app.use('/static', express.static('assets'));

app.get('/', function(req, res){
 res.json({"welcome" : "Now Playing"});
});

// public route
// app.use('/user', user);
app.use('/api', routeController)

// app.use('/api/genre', genre);
// app.use('/api/artis', artis);

// private route
// app.use('/artis', validateUser, artis);
// app.use('/genre', validateUser, genre);

app.get('/favicon.ico', function(req, res) {
  res.sendStatus(204);
});

// cek token
function validateUser(req, res, next) {
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

app.listen(port, function(){
  console.log('Node server listening on port 96');
});
