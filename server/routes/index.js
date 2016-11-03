var express = require('express');
var router = express.Router();

var indexCtrl = require('../controllers/IndexCtrl');

/* GET home page. */
router.get('/', indexCtrl.getIndex);

module.exports = router;
