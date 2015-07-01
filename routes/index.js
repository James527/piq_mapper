var express = require('express');
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var session = require('express-session');
var _und = require('underscore');
// var $ = require('jquery');
// var ajax = require('ajax');
var router = express.Router();

//////////* GET HOME PAGE *//////////
router.get('/', function(req, res, next) {
	mongoose.model('piqs').find(function(err, piqs) {

	  res.render('index', { piqs: piqs });
	});
});

//////////* GET REGISTERATION FORM *//////////
router.get('/register', function(req, res, next) {
	// TODO: Pass register_check into render and take it out of header.ejs

  res.render('registration_form');
});

//////////* GET LOGIN FORM *//////////
router.get('/login', function(req, res, next) {
  res.render('login_form');
});

//////////* GET USERS PAGE *//////////
router.get('/users', function(req, res, next) {
  mongoose.model('users').find(function(err, users) {
	var userlist = [];
	for (i = 0; i < users.length; i++) {
		userlist.push(users[i].username);
	}
    res.render('users', { userlist: userlist });
  });
});

//////////* GET USER ACCOUNT *//////////
router.get('/users/:username', function(req, res) {
	mongoose.model('users').find({username: req.params.username}, function(err, users) {

		// User session
		console.log(req.cookies);
		console.log('=====================');
		console.log(req.session);

		// res.session.name = req.params.username;
		var user = users[0];

		// TODO: Don't pass the user object into the page
		// without omitting the password
		// underscore isn't working for some reason
		// var dude = underscore.omit(user, 'password');

		res.render('profile', { user: user });
	});
});

//////////* GET PIQ SUBMISSION FORM *//////////
router.get('/piq_form', function(req, res, next) {
	res.render('piq_form');
});

//////////* GET PIQS PAGE *//////////
router.get('/piqs', function(req, res, next) {
	mongoose.model('piqs').find(function(err, piqs) {
	  res.render('piqs', { piqs: piqs });
	});
});

// EXAMPLE - Getting the user through piqs:
// app.get('/piqs/:userId', function(req, res) {
//   mongoose.model('piqs').find({user: req.params.userId}, function(err, piqs) {
//     mongoose.model('piqs').populate(piqs, {path: 'user'}, function(err, piqs) {
//       res.send(piqs);
//     });
//   });
// });


//////////* GET USERS PIQS PAGE *//////////
router.get('/user/piqs', function(req, res, next) {
	// Pull the users data from the database

	// Pull their piqs data from the database

	// Render the MyPiqs page
	res.render('mypiqs');
});

//////////* GET PIQ PAGE *//////////
router.get('/piq/:piq_id', function(req, res, next) {


	// Render the Piq Page
	res.render('piq');
});

//////////* GET USER STAT PAGE *//////////
router.get('/user/stats', function(req, res, next) {

	// Send stats to the Profile Page
});

//////////* GET USER PROFILE PAGE *//////////
router.get('/profile', function(req, res, next) {

	// Render the Profile Page
	res.render('profile');
});

//////////* GET PASSWORD RESET FORM *//////////
router.get('/password_reset', function(req, res, next) {

	// Render the Password Reset Page
	res.render('reset_password_form');
});

//////////* GET ABOUT PAGE *//////////
router.get('/about', function(req, res, next) {

	// Render the About Page
	res.render('about');
});

//////////* POST LOGOUT *//////////
router.post('/logout', function(req, res, next) {

	// Clear the session data

	// Redirect to login page
	res.redirect('/login');
});

//////////* POST USER REGISTRATION *//////////
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

	  res.redirect('/users');
	});
});

//////////* POST USER LOGIN *//////////
router.post('/login', function(req, res, next) {
	mongoose.model('users').find({username: req.body.username}, function(err, users) {
		var login = req.body;
		var username = login.username;
		var userId = users[0]._id;
		var hash = users[0].password;

		test = bcrypt.compareSync(login.password, hash);
		// console.log(test);
		if (test) {
			var user = users[0];

			// Start user session
			req.session.userId = userId;

			res.redirect('/users');
		}
	});
});

//////////* POST PIQ SUBMISSION *//////////
router.post('/piq_form', function(req, res, next) {
	mongoose.model('piqs').find(function(err, piqs, piqsSchema) {
		var piq = req.body;
		console.log(piq.color);
	  res.redirect('/piqs');
	});
});


//////////* PUT (EDIT) USER REGISTRATION  *//////////

//////////* PUT (EDIT) USER PASSWORD *//////////

//////////* DELETE USER PIQ *//////////

//////////* DELETE USER *//////////

module.exports = router;
