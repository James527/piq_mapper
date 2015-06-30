var express = require('express');
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	mongoose.model('piqs').find(function(err, piqs) {
	  res.render('index', { piqs: piqs });
	})
});

/* GET register form. */
router.get('/register', function(req, res, next) {
  res.render('register_form');
});

/* GET login form. */
router.get('/login', function(req, res, next) {
  res.render('login_form');
});

/* GET users listing. */
router.get('/users', function(req, res, next) {
  mongoose.model('users').find(function(err, users) {
	var userlist = [];
	for (i = 0; i < users.length; i++) {
		userlist.push(users[i].username);
	}
  	// var userlist = getUserList(users);
  	// console.log(userlist);
  	// console.log(users[0].username);
    res.render('users', { userlist: userlist });
  })
});

/* GET piq form. */
router.get('/piq_form', function(req, res, next) {
	res.render('piq_form');
});

/* GET piqs page. */
router.get('/piqs', function(req, res, next) {
	res.render('piqs', { piqs: {'color':'#ff0000'} });
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
  res.render('index', { piq: {'color':'#ff0000'} });
});

/* POST login. */
router.post('/login', function(req, res, next) {
	// TODO:
  res.render('index', { piq: {'color':'#ff0000'} });
});

/* POST piq. */
router.post('/piq_form', function(req, res, next) {
	// TODO:
  res.render('index', { piq: {'color':'#ff0000'} });
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
