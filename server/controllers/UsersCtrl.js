'use strict';
const mongoose = require('mongoose');

const User = mongoose.model('User');

module.exports.getUsers = (req, res) => {
  var users = User.find({}, function (err, users) {
      if(err) console.log(err);
      res.status(200);
      res.render('users/index', {users: users});
  });
};

module.exports.showUser = (req, res) => {
  var user = User.findOne({email: req.params.email}, function (err, user) {
      if(err) console.log(err);
      res.status(200);
      res.render('users/show', {user: user});
  });
}