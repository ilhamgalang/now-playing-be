const userModel = require('../models/userModel');
const sha1 = require('js-sha1');
const jwt = require('jsonwebtoken');

module.exports = {

  // create user
  create: function(req, res, next) {
    // cek apakah username sudah ada
    userModel.findOne({
      username: req.body.username
    }, function(err, userInfo) {
      if (err) {
        next(err)
      } else {
        // jika ada
        if (userInfo != null) {
          res.json({
            status: "error",
            message: "Username already exist!",
            data: null
          });
        // jika tidak ada
        } else {
          // buat user baru
          userModel.create({
            username: req.body.username,
            name: req.body.name,
            password: req.body.password
          }, function(err, result) {
            if (err) {
                next(err);
            } else {
              res.json({
                status: "success",
                message: "User added successfully!",
                data: null
              });
            }
          });
        }
      }
    });
  },

  // login dan buat authenticate
  authenticate: function(req, res, next) {
    // cek username
    userModel.findOne({
      username: req.body.username
    }, function(err, userInfo) {
      if (err) {
        next(err)
      } else {
        // cek password
        if (userInfo != null && sha1(req.body.password) === userInfo.password) {
          // jika berhasil login
          // buat token
          const token = jwt.sign({
            id: userInfo._id
          }, req.app.get('secretKey'), {expiresIn: '1h'});
          res.json({
            status: "success",
            message: "user found!",
            token: token,
            data: userInfo
          });
        } else {
          // jika gagal login
          res.json({
            status: "error",
            message: "Invalid userame/password!",
            token: null,
            data: null
          });
        }
      }
    });
  }

}
