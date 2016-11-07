var express = require('express');
var router = express.Router();
var passport = require('passport');
var authCtrl = require('../controllers/AuthCtrl');

/** Middlewares */
var authenticated = require('../middlewares/Authenticated');
var redirectAuthenticated = require('../middlewares/RedirectAuthenticated');

router.get('/login', redirectAuthenticated, authCtrl.getLogin);

router.post('/login', redirectAuthenticated, authCtrl.login);

router.get('/logout', authenticated, authCtrl.logout);

router.get('/register', redirectAuthenticated, authCtrl.getRegister);

router.post('/register', redirectAuthenticated, authCtrl.register);

module.exports = router;