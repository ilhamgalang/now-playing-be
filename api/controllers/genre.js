const genreModel = require('../models/genreModel');

module.exports = {

  getAll: function(req, res, next) {
    let genreList = [];
    var sort = {};
    if (req.query.sortKey != undefined) {
      sort[req.query.sortKey] = req.query.sortValue;      
    }

    genreModel.find({}, function(err, result) {
      if (err) {
        next(err);
      } else {
        for (let data of result) {
          genreList.push({
            id: data._id,
            genre: data.genre,
            image: data.image
          });
        }
        res.json({
          status: "success",
          message: "Genre list found!",
          data: genreList
        });
      }
    }).sort(sort);
  },

  create: function(req, res, next) {
    genreModel.create({
      genre: req.body.genre,
      image: req.body.image
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
  },

  updateById: function(req, res, next) {
    genreModel.findByIdAndUpdate(req.params.genreId,
    {
      genre: req.body.genre
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
  },

  deleteById: function(req, res, next) {
    genreModel.findByIdAndRemove(req.params.genreId, function(err, result) {
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

}
