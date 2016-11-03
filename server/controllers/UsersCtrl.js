'use strict';
const mongoose = require('mongoose');

const User = mongoose.model('User');

module.exports.getUsers = (req, res) => {
  var users = User.find({}, function (err, users) {
      if(err) console.log(err);
      res.status(200);
      res.json({users: users});
  });
};

module.exports.showUser = (req, res) => {
  var user = User.find({email: req.params.email}, function (err, user) {
      if(err) console.log(err);
      res.status(200);
      res.json({user: user});
  });
}