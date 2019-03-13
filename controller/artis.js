
const multer  = require('multer')
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'assets/img/artis/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})
const upload = multer({storage: storage}).single('filepond')

const artisModel = require('../model/artisModel');

exports.getAll = function(req, res, next) {
  let artisList = [];
  artisModel.find({}, function(err, result) {
    if (err) {
      next(err);
    } else {      
      res.json({
        data: result
      });
    }
  })
}

exports.create = function(req, res, next) {
  artisModel.create({
    genre: req.body.genre,
    image: 'img/artis/' + req.body.image,
    name: req.body.name
  }, function(err, result) {
    if (err) {
      next(err);
    } else {
      res.json({
        status: "success",
        message: "Artis added successfully!",
        data: null
      });
    }
  });
}

exports.deleteById = function(req, res, next) {
  artisModel.findByIdAndRemove(req.params.id, function(err, result) {
    if (err) {
      next(err)
    } else {
      res.json({
        status: "success",
        message: "Artis deleted successfully!",
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
