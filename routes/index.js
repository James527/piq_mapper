var express = require('express');
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'PiqMapper', piq: {'color':'#ff0000'} });
});

/* GET register form. */
router.get('/register', function(req, res, next) {
  res.render('register_form', { title: 'PiqMapper' });
});

/* GET login form. */
router.get('/login', function(req, res, next) {
  res.render('login_form', { title: 'PiqMapper' });
});

/* GET piq form. */
router.get('/piq_form', function(req, res, next) {
	res.render('piq_form', { title: 'PiqMapper' });
});

/* GET piqs page. */
router.get('/piqs', function(req, res, next) {
	res.render('piqs', { title: 'PiqMapper', piqs: {'color':'#ff0000'} });
});

/* POST registration. */
router.post('/register', function(req, res, next) {
	// console.log(req);
	// bcrypt.genSalt(10, function(err, salt) {
	// 	bcrypt.hash("B4c0/\/", salt, function() {

	// 	});
	// });
	// var salt = bcrypt.genSaltSync(10);
	// var hash = bcrypt.hashSync("B4c0/\/", salt);
  res.render('index', { title: 'PiqMapper', piq: {'color':'#ff0000'} });
});

/* POST login. */
router.post('/login', function(req, res, next) {
	// TODO:
  res.render('index', { title: 'PiqMapper', piq: {'color':'#ff0000'} });
});

/* POST piq. */
router.post('/piq_form', function(req, res, next) {
	// TODO:
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
