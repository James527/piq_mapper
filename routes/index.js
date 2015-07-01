var express = require('express');
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var session = require('express-session');
var _und = require('underscore');
// var $ = require('jquery');
// var ajax = require('ajax');
var router = express.Router();

// Check if the session userId is undifined, if so redirect to login
function sessionUndefined(req, res) {
	if (req.session.userId == undefined) {
		session = false;
		res.redirect('/login');
	}
};

// Check for the session userId
function sessionCheck(req, res) {
	if (req.session.userId) {
		session = true;
		res.redirect('/');
	}
	else {
		session = false;
	}
};

//////////* GET HOME PAGE *//////////
router.get('/', function(req, res, next) {
	mongoose.model('piqs').find(function(err, piqs) {
		sessionUndefined(req, res);

	  res.render('index', { piqs: piqs, session: session });
	});
});

//////////* GET REGISTERATION FORM *//////////
router.get('/register', function(req, res, next) {
	sessionCheck(req, res);
	// TODO: Pass register_check into render and take it out of header.ejs

  res.render('registration_form', { session: session });
});

//////////* GET LOGIN FORM *//////////
router.get('/login', function(req, res, next) {
	sessionCheck(req, res);

  res.render('login_form', { session: session });
});

//////////* GET USERS PAGE *//////////
router.get('/users', function(req, res, next) {
	sessionUndefined(req, res);
	mongoose.model('users').find(function(err, users) {
		var userlist = [];
		for (i = 0; i < users.length; i++) {
			userlist.push(users[i].username);
		}
	    res.render('users', { users: userlist, session: session });
	});
});

//////////* GET USER ACCOUNT *//////////
router.get('/user/:username', function(req, res) {
	sessionUndefined(req, res);
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

		res.render('profile', { user: user, session: session });
	});
});

//////////* GET PIQ SUBMISSION FORM *//////////
router.get('/piq_form', function(req, res, next) {
	sessionUndefined(req, res);

		// User session
		console.log(req.cookies);
		console.log('=====================');
		console.log(req.session);
		console.log(req.session.userId);

	res.render('piq_form', { session: session });
});

//////////* GET PIQS PAGE *//////////
router.get('/piqs', function(req, res, next) {
	sessionUndefined(req, res);
	mongoose.model('piqs').find(function(err, piqs) {
	  res.render('piqs', { piqs: piqs, session: session });
	});
});

//////////* GET USERS PIQS PAGE *//////////
router.get('/user/:username/piquancy', function(req, res, next) {
	sessionUndefined(req, res);
	mongoose.model('users').find({username: req.params.username}, function(err, users) {
		mongoose.model('piqs').find({user: users[0]._id}, function(err, piqs) {

			// Render the MyPiqs page
			res.render('mypiqs', { mypiqs: piqs, session: session });
		});
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

//////////* GET PIQ PAGE *//////////
router.get('/piq/:piq_id', function(req, res, next) {
	sessionUndefined(req, res);
	mongoose.model('piqs').find({_id: req.params.piq_id}, function(err, piqs) {
		console.log(piqs);
		// Render the Piq Page
		res.render('piq', { piq: piqs, session: session });
	});
});

//////////* GET USER STAT PAGE *//////////
router.get('/user/:username/stats', function(req, res, next) {
	sessionUndefined(req, res);

	// Send stats to the Profile Page
});

//////////* GET USER PROFILE PAGE *//////////
router.get('/profile', function(req, res, next) {
	sessionUndefined(req, res);

	// TODO: Redirect to Users Profile Page
	res.redirect('/user/jmz527', { session: session });
});

//////////* GET PASSWORD RESET FORM *//////////
router.get('/password_reset', function(req, res, next) {

	// Render the Password Reset Page
	res.render('reset_password_form', { session: session });
});

//////////* GET ABOUT PAGE *//////////
router.get('/about', function(req, res, next) {
	// Render the About Page
	res.render('about', { session: session });
});

//////////* POST LOGOUT *//////////
router.get('/logout', function(req, res, next) {
	// TODO: Clear the session data and set session var to false

	// Redirect to login page
	res.redirect('/login', { session: session });
});

//////////* POST USER REGISTRATION *//////////
router.post('/register', function(req, res, next) {
	sessionCheck(req, res);
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
	sessionCheck(req, res);
	mongoose.model('users').find({username: req.body.username}, function(err, users) {
		var login = req.body;
		var username = login.username;
		var userId = users[0]._id;
		var hash = users[0].password;

		pass = bcrypt.compareSync(login.password, hash);
		// console.log(test);
		if (pass) {
			// Start user session
			var user = users[0];
			req.session.userId = userId;

			// TODO: Redirect to Profile
			res.redirect('/users');
		}
	});
});

//////////* POST PIQ SUBMISSION *//////////
router.post('/piq_form', function(req, res, next) {
	sessionUndefined(req, res);
	mongoose.model('users').find({_id: req.session.userId}, function(err, users) {
		mongoose.model('piqs').find(function(err, piqs, piqsSchema) {
			var Piq = mongoose.model('piqs', piqsSchema);
			var piq = req.body;
			var uID = users[0]._id;
			console.log(uID);
			piq.user = uID;
			console.log(piq);

			// Save to the database
			var newPiq = new Piq(piq);
			newPiq.save(function (err, newPiq) {
				if (err) return console.error(err);
			});

		  res.redirect('/piqs', { session: session });
		});
	});
});


//////////* PUT (EDIT) USER REGISTRATION  *//////////
router.put('/register', function(req, res, next) {
	// sessionUndefined(req, res);

	//Save changes to the database

	//Redirect to the Users Profile Page
	res.redirect('/profile', { session: session });
});

//////////* PUT (EDIT) USER PASSWORD *//////////
router.put('/password_reset', function(req, res, next) {
	// sessionUndefined(req, res);

	//Save changes to the database

	//Redirect to the Login Page
	res.redirect('/login', { session: session });
});

//////////* DELETE USER PIQ *//////////

//////////* DELETE USER *//////////

module.exports = router;
