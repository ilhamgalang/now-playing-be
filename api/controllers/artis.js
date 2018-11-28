const artisModel = require('../models/artisModel');

module.exports = {

  getById: function(req, res, next) {
    artisModel.findById(req.params.artisId, function(err, artisInfo) {
      if (err) {
        next(err);
      } else {
        res.json({
          status: "success",
          message: "Artis Found!",
          data: artisInfo
        });
      }
    });
  },

  getAll: function(req, res, next) {
    let artisList = [];
    var filter = {};
    if (req.query.filter != undefined) {
      if (req.query.filter != 'all') {
        filter = '^' + req.query.filter;              
      }
    }
    console.log(req.query.filter);
    console.log(filter);
    
    artisModel.find({ "name" : { $regex : new RegExp(filter, "i") } }, function(err, result) {
      if (err) {
        next(err);
      } else {
        for (let data of result) {
          artisList.push({
            id: data._id,
            name: data.name,
            genre: data.genre,
            image: data.image
          });
        }
        res.json({
          status: "success",
          message: "Artis list found!",
          data: artisList
        });
      }
    });
  },

  updateById: function(req, res, next) {
    artisModel.findByIdAndUpdate(req.params.artisId,
      {
        name: req.body.name,
        genre: req.body.genre
      }, function(err, artisInfo){
        if(err) {
          next(err);
        } else {
          res.json({
            status:"success",
            message: "Artis updated successfully!",
            data:null
          });
        }
      });
   },

  deleteById: function(req, res, next) {
    artisModel.findByIdAndRemove(req.params.artisId, function(err, artisInfo) {
      if (err) {
        next(err);
      } else {
        res.json({
          status: "success",
          message: "Artis deleted successfully!",
          data: null
        });
      }
    });
  },

  create: function(req, res, next) {
    artisModel.create({
      name: req.body.name,
      genre: req.body.genre
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

}
