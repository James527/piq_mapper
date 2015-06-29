var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

// var piqs = mongoose.model('piqs').find(function(err, piqs) {
//     res.send('piqs');
// });

// console.log(piqs)

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'PiqMapper', piq: {'color':'#ff0000'} });
});

// app.get('/piqs', function(req, res) {
//   mongoose.model('piqs').find(function(err, piqs) {
//     res.send('piqs');
//   })
// });

// app.get('/piqs', function(req, res) {
//   mongoose.model('piqs').find(function(err, piqs) {
//     res.send(piqs);
//   });
// });

// app.get('/piqs/:userId', function(req, res) {
//   mongoose.model('piqs').find({user: req.params.userId}, function(err, piqs) {
//     mongoose.model('piqs').populate(piqs, {path: 'user'}, function(err, piqs) {
//       res.send(piqs);
//     });
//   });
// });

module.exports = router;
