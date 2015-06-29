var express = require('express');
var mongoose = require('mongoose')
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  mongoose.model('users').find(function(err, users) {
    res.send(users);
  })
});

module.exports = router;
