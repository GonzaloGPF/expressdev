var express = require('express');
var router = express.Router();
var passport = require('passport');
var authCtrl = require('../controllers/AuthCtrl');

/** Middlewares */
var authenticated = require('../middlewares/Authenticated');
var redirectAuthenticated = require('../middlewares/RedirectAuthenticated');

router.get('/login', redirectAuthenticated, authCtrl.getLogin); // <-- Nuevo

router.post('/login', redirectAuthenticated, authCtrl.login);   // <-- Nuevo

router.get('/logout', authenticated, authCtrl.logout);          // <-- Nuevo

router.get('/register', redirectAuthenticated, authCtrl.getRegister);  // <-- Nuevo

router.post('/register', redirectAuthenticated, authCtrl.register);    // <-- Nuevo

module.exports = router;