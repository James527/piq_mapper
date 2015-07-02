var express = require('express');
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var session = require('express-session');
var _und = require('underscore');

var router = express.Router();

// Setting app variables
var navObj = [];
var userlist = [];

//____FUNCTIONS________________________________________________//

	// Check for the session userId
	function isNotLoggedIn(req, res) {
		if (req.session.userId == undefined || req.session.userId == null) {
			console.log('You have no session. Log In!');
			return res.redirect('/login');
		}
	};

	function isLoggedIn(req, res) {
		if (req.session.userId) {
			console.log('You are logged in!');
			return res.redirect('/users');
		}
	};

	// Checks if current session has userId and passes one of the two Nav Objects
	function setNav(req) {
		// console.log(req.session.userId);
		if (req.session.userId) {
			return navObj = [{ref: "piq_form"}, {ref: 'users'}, {ref: 'piqs'}, {ref: 'logout'}];
		}
		else {
			return navObj = [{ref: "login"}, {ref: 'register'}];
		}
	}


//____PAGE ROUTES________________________________________________//

	//////////* GET HOME PAGE *//////////
	router.get('/', function(req, res, next) {
		mongoose.model('piqs').find(function(err, piqs) {
			setNav(req);

			// // User session
			// console.log(req.cookies);
			// console.log('=====================');
			// console.log(req.session);
			// console.log(req.session.userId);
			// console.log("navObj: " + navObj);

		  res.render('index', { piqs: piqs, navItems: navObj });
		});
	});

	//////////* GET REGISTERATION FORM *//////////
	router.get('/register', function(req, res, next) {
		setNav(req);
		isLoggedIn(req, res);

		// TODO: Pass register_check into render and take it out of header.ejs

	  res.render('registration_form', { navItems: navObj });
	});

	//////////* GET LOGIN FORM *//////////
	router.get('/login', function(req, res, next) {
		setNav(req);
		isLoggedIn(req, res);

	  res.render('login_form', { navItems: navObj });
	});

	//////////* GET USERS PAGE *//////////
	router.get('/users', function(req, res, next) {
		mongoose.model('users').find(function(err, users) {
			setNav(req);
			isNotLoggedIn(req, res);
			userlist = [];
			for (i = 0; i < users.length; i++) {
				userlist.push(users[i].username);
			}
		    res.render('users', { users: userlist, navItems: navObj });
		});
	});

	//////////* GET USER ACCOUNT *//////////
	router.get('/user/:username', function(req, res) {
		mongoose.model('users').find({username: req.params.username}, function(err, users) {
			setNav(req);
			isNotLoggedIn(req, res);

			// res.session.name = req.params.username;
			var user = users[0];

			// TODO: Don't pass the user object into the page
			// without omitting the password
			// underscore isn't working for some reason
			// var dude = underscore.omit(user, 'password');

			res.render('profile', { user: user, navItems: navObj });
		});
	});

	//////////* GET PIQ SUBMISSION FORM *//////////
	router.get('/piq_form', function(req, res, next) {
		setNav(req);
		isNotLoggedIn(req, res);

		res.render('piq_form', { navItems: navObj });
	});

	//////////* GET PIQS PAGE *//////////
	router.get('/piqs', function(req, res, next) {
		mongoose.model('piqs').find(function(err, piqs) {
			setNav(req);
			isNotLoggedIn(req, res);

		  res.render('piqs', { piqs: piqs, navItems: navObj });
		});
	});

	//////////* GET USERS PIQS PAGE *//////////
	router.get('/user/:username/piquancy', function(req, res, next) {
		mongoose.model('users').find({username: req.params.username}, function(err, users) {
			mongoose.model('piqs').find({user: users[0]._id}, function(err, piqs) {
				setNav(req);
				isNotLoggedIn(req, res);

				res.render('mypiqs', { mypiqs: piqs, navItems: navObj });
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
		mongoose.model('piqs').find({_id: req.params.piq_id}, function(err, piqs) {
			setNav(req);
			isNotLoggedIn(req, res);

			console.log(piqs);
			res.render('piq', { piq: piqs, navItems: navObj });
		});
	});

	//////////* GET USER STAT PAGE *//////////
	// router.get('/user/:username/stats', function(req, res, next) {
	// 	setNav(req);
	// 	isNotLoggedIn(req, res);

		// Send stats to the Profile Page
	// });

	//////////* GET USER PROFILE PAGE *//////////
	router.get('/profile', function(req, res, next) {
		setNav(req);
		isNotLoggedIn(req, res);

		// TODO: Redirect to Users Profile Page
		res.redirect('/user/jmz527', { navItems: navObj });
	});

	//////////* GET PASSWORD RESET FORM *//////////
	router.get('/password_reset', function(req, res, next) {
		setNav(req);
		isNotLoggedIn(req, res); // <-- MAYBE TAKE THIS OUT LATER...

		
		res.render('reset_password_form', { navItems: navObj });
	});

	//////////* GET ABOUT PAGE *//////////
	router.get('/about', function(req, res, next) {
		setNav(req);

		
		res.render('about', { navItems: navObj });
	});

	//////////* GET LOGOUT *//////////
	router.get('/logout', function(req, res, next) {
		setNav(req);

		// TODO: Clear the session data and set session var to false

		// Redirect to login page
		res.redirect('/login', { navItems: navObj }); // <-- REDIRECT NOT WORKING
	});

//____POST ROUTES________________________________________________//

	//////////* POST USER REGISTRATION *//////////
	router.post('/register', function(req, res, next) {
		mongoose.model('users').find(function(err, users, usersSchema) {
			setNav(req);
			isLoggedIn(req, res);

			var submission = req.body;
			delete submission.passwordAgain;

			// Hash the users password synchronously:
			var password_hash = bcrypt.hashSync(submission.password, 10);
			submission.password = password_hash;

			// console.log(submission);
			// console.log(submission.username + ", " + submission.email + ", " + submission.name + ", " + password_hash);

			// Hash the users password Asynchronously:
			// bcrypt.genSalt(10, function(err, salt) {
			// 	// bcrypt.hash(password, salt, function() {
			// 	// 	// console.log();
			// 	// });
			// });

			// Creates a user model
			var User = mongoose.model('users', usersSchema);

			// Creates a newUser object from the user model...
			var newUser = new User(submission);
			// ...saves it to the database
			newUser.save(function (err, newUser) {
				if (err) return console.error(err);
			});

		  res.redirect('/users', { navItems: navObj });
		});
	});

	//////////* POST USER LOGIN *//////////
	router.post('/login', function(req, res, next) {
		mongoose.model('users').find({username: req.body.username}, function(err, users) {
			setNav(req);
			isLoggedIn(req, res);

			var login = req.body;
			var username = login.username;
			var userId = users[0]._id;
			var hash = users[0].password;

			// Compares the login password to the hashed password
			pass = bcrypt.compareSync(login.password, hash);
			if (pass) {
				// Start user session
				var user = users[0];
				req.session.userId = userId;

				res.redirect('/users'); // <-- TODO: Redirect to Profile
			}
		});
	});

	//////////* POST PIQ SUBMISSION *//////////
	router.post('/piq_form', function(req, res, next) {
		mongoose.model('users').find({_id: req.session.userId}, function(err, users) {
			mongoose.model('piqs').find(function(err, piqs, piqsSchema) {
				setNav(req);
				isNotLoggedIn(req, res);

				var piq = req.body;
				var uID = users[0]._id;
				// console.log(uID);
				piq.user = uID;
				// console.log(piq);

				// Creates a Piq model
				var Piq = mongoose.model('piqs', piqsSchema);

				// Makes a newPiq object from the model...
				var newPiq = new Piq(piq);
				// ...and saves it to the database
				newPiq.save(function (err, newPiq) {
					if (err) return console.error(err);
				});

			  res.redirect('/piqs', { navItems: navObj });
			});
		});
	});

//____EDIT ROUTES________________________________________________//

	//////////* PUT (EDIT) USER REGISTRATION  *//////////
	router.put('/register', function(req, res, next) {
		// setNav(req);
		// isNotLoggedIn(req, res);

		//Save changes to the database

		//Redirect to the Users Profile Page
		res.redirect('/profile', { navItems: navObj });
	});

	//////////* PUT (EDIT) USER PASSWORD *//////////
	router.put('/password_reset', function(req, res, next) {
		// setNav(req);
		// isNotLoggedIn(req, res);

		//Save changes to the database

		//Redirect to the Login Page
		res.redirect('/login', { navItems: navObj });
	});

//____DELETE ROUTES________________________________________________//

	//////////* DELETE USER PIQ *//////////



	//////////* DELETE USER *//////////


//____AJAX ROUTES________________________________________________//

	//////////* GET AJAX PIQS *//////////
	router.get('/ajax', function(req, res) {
		mongoose.model('piqs').find(function(err, piqs) {
			piqsData = piqs;

		  res.send(piqsData);
		});
	});

	//////////* GET AJAX  *//////////



//____EXPORT________________________________________________//
module.exports = router;