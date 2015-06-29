var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'PiqMapper' });
});

// app.get('/piqs', function(req, res) {
//   mongoose.model('piqs').find(function(err, piqs) {
//     res.send(piqs);
//   })
// })

module.exports = router;
