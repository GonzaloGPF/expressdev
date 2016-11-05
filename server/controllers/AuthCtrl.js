'use strict';
const mongoose = require('mongoose');

const User = mongoose.model('User');
const passport = require('passport');

module.exports.getRegister = (req, res) => {
    res.render('auth/register', { });
};

module.exports.register = (req, res) => {
    let salt = User.getSalt();
    User.create({
        'name': req.body.name,
        'email': req.body.email,
        'password': User.hashPassword(req.body.password, salt),
        'passwordSalt': salt
    }, function(err, user){
        if(err) console.log(err);

        req.login(user, function(err) {
            if (err) console.log(err);
            console.log(`User ${req.user.name} registered`);
            return res.redirect('/'); //res.redirect('/users/' + req.user.username);
        });
    });
};

module.exports.getLogin = (req, res) => {
    res.render('auth/login', {});
};

module.exports.login = (req, res, next) => {
    passport.authenticate('local', function(err, user, info) {
        if (err) { return next(err); }
        if (!user) {
            req.flash('error', info.message);
            return res.redirect('/auth/login');
        }
        req.logIn(user, function(err) {
            if (err) { return next(err); }
            //return res.redirect('/users/' + user.username);
            console.log(`User ${req.user.name} logged in`);
            return res.redirect('/');
        });
    })(req, res, next);
};

module.exports.logout = (req, res) => {
    console.log(`User ${req.user.name} logged out`);
    req.logout();
    res.redirect('/');
};