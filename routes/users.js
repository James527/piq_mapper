var express = require('express');
var mongoose = require('mongoose')
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  mongoose.model('users').find(function(err, users) {
    res.send(users);
  })
});

/* GET user account. */
router.get('/:username', function(req, res) {
	mongoose.model('users').find({username: req.params.username}, function(err, users) {
		res.send(users);
	});
});

// app.get('/piqs/:userId', function(req, res) {
//   mongoose.model('piqs').find({user: req.params.userId}, function(err, piqs) {
//     mongoose.model('piqs').populate(piqs, {path: 'user'}, function(err, piqs) {
//       res.send(piqs);
//     });
//   });
// });

module.exports = router;
