const fs = require('fs')
const multer  = require('multer')
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'assets/img/genre/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})
const upload = multer({storage: storage}).single('filepond')
// var upload = multer({ dest: 'assets/img/genre',  }).single('filepond')

const genreModel = require('../model/genreModel');

exports.getAll = function(req, res, next) {
  let genreList = [];
  genreModel.find({}, function(err, result) {
    if (err) {
      next(err);
    } else {      
      res.json({
        data: result
      });
    }
  })
}

exports.getLOV = function(req, res, next) {
  let genreList = [];
  genreModel.find({}, function(err, result) {
    if (err) {
      next(err);
    } else {
      data = [];    
      for (let index = 0; index < result.length; index++) {
        data.push(result[index].genre);
      }  
      res.json({
        value: data
      });
    }
  }).sort( { genre: 1 } )
}

exports.create = function(req, res, next) {
  genreModel.create({
    genre: req.body.genre,
    image: 'img/genre/' + req.body.image
  }, function(err, result) {
    if (err) {
      next(err);
    } else {
      res.json({
        status: "success",
        message: "Genre added successfully!",
        data: null
      });
    }
  });
}

exports.update = function(req, res, next) {
  genreModel.findByIdAndUpdate(req.body._id,
  {
    genre: req.body.genre,
    image: req.body.image
  }, function(err, result) {
    if (err) {
      next(err);
    } else {
      res.json({
        status: "success",
        message: "Genre updated successfully!",
        data: null
      });
    }
  });
}

exports.deleteById = function(req, res, next) {
  genreModel.findByIdAndRemove(req.params.id, function(err, result) {
    if (err) {
      next(err)
    } else {
      res.json({
        status: "success",
        message: "Genre deleted successfully!",
        data: null
      });
    }
  });
}

exports.uploadImg = function(req, res, next) {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading.
    } else if (err) {
      // An unknown error occurred when uploading.
    }

    // Everything went fine.
  });
  res.json({
    status: '123'
  })
}

// exports.uploadConfig = upload.single('filepond');