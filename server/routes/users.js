var express = require('express');
var router = express.Router();

var usersCtrl = require('../controllers/UsersCtrl');

/* GET users listing. */
router.get('/', usersCtrl.getUsers);

/* GET user by email */
router.get('/:email', usersCtrl.showUser);

module.exports = router;
