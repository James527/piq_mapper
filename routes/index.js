var express = require('express');
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	mongoose.model('piqs').find(function(err, piqs) {
	  res.render('index', { piqs: piqs });
	});
});

/* GET register form. */
router.get('/register', function(req, res, next) {
	// TODO: Pass register_check into render and take it out of header.ejs

  res.render('registration_form');
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
    res.render('users', { userlist: userlist });
  });
});

/* GET a users account. */
router.get('/users/:username', function(req, res) {
	mongoose.model('users').find({username: req.params.username}, function(err, users) {
		// TODO: Don't use the users view. Create a user account view.
		res.render('users', { userlist: users } );
	});
});

/* GET piq form. */
router.get('/piq_form', function(req, res, next) {
	res.render('piq_form');
});

/* GET piqs page. */
router.get('/piqs', function(req, res, next) {
	mongoose.model('piqs').find(function(err, piqs) {
	  res.render('piqs', { piqs: piqs });
	});
});

/* POST registration. */
router.post('/register', function(req, res, next) {
	mongoose.model('users').find(function(err, users, usersSchema) {
		var User = mongoose.model('users', usersSchema);
		var submission = req.body;
		delete submission.passwordAgain;

		// Hash the users password:
		var password_hash = bcrypt.hashSync(submission.password, 10);
		submission.password = password_hash;
		// console.log(submission);

		// console.log(submission.username + ", " + submission.email + ", " + submission.name + ", " + password_hash);
		// bcrypt.genSalt(10, function(err, salt) {
		// 	// bcrypt.hash(password, salt, function() {
		// 	// 	// console.log();
		// 	// });
		// });

		var newUser = new User(submission);
		newUser.save(function (err, newUser) {
			if (err) return console.error(err);
		});

	  res.render('registration_form');
	});
});

/* POST login. */
router.post('/login', function(req, res, next) {
	mongoose.model('users').find({username: req.body.username}, function(err, users) {
		var login = req.body;
		var username = login.username;
		var hash = users[0].password;
		test = bcrypt.compareSync(login.password, hash);
		// console.log(test);

		if (test) {
			res.render('users', { userlist: [username] });
		}
	});
});

/* POST piq. */
router.post('/piq_form', function(req, res, next) {
	mongoose.model('piqs').find(function(err, piqs, piqsSchema) {
		var piq = req.body;
		console.log(piq.color);
	  res.render('piq_form');
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
