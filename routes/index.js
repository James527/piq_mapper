var express = require('express');
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var session = require('express-session');
var router = express.Router();

// Setting app variables
var navObj = [];
var userlist = [];

//____FUNCTIONS________________________________________________//

	// Check for the session userId
	function isNotLoggedIn(req, res) {
		if (req.session.userId == undefined || req.session.userId == null) {
			// console.log('You have no session. Log In!');
			return res.redirect('/');
		}
	};

	function isLoggedIn(req, res) {
		if (req.session.userId) {
			// console.log('You are logged in!');
			return res.redirect('/users');
		}
	};

	// // Checks if current session has userId and passes one of the two Nav Objects
	function setNav(req) {
		if (req.session.userId) {
			// return navObj = [{ref: "add_piq"}, {ref: 'users'}, {ref: 'piqs'}, {ref: 'logout'}];
			return navObj = [{ref: "add_piq"}, {ref: 'reset'}, {ref: 'update'}, {ref: 'logout'}];
		}
		else {
			return navObj = [{ref: "login"}, {ref: 'register'}];
		}
	}


//____PAGE ROUTES________________________________________________//

	//////////* GET HOME PAGE *//////////
	router.get('/', function(req, res, next) {
		mongoose.model('piqs').find(function(err, piqs) {
			mongoose.model('users').find(function(err, users) {
				setNav(req);
				// isLoggedIn(req, res);

			  res.render('index', { piqs: piqs, navItems: navObj });
			});
		});
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

			var user = users[0];

			// TODO: Don't pass the user object into the page
			// without omitting the password (underscore?)
			res.render('profile', { user: user, navItems: navObj });
		});
	});

	//////////* GET PIQ PAGE *//////////
	router.get('/piq/:piq_id', function(req, res, next) {
		mongoose.model('piqs').find({_id: req.params.piq_id}, function(err, piqs) {
			// Set up another callback to get the piq's user data
			setNav(req);
			isNotLoggedIn(req, res);

			// console.log(piqs);
			res.render('piq', { piq: piqs, navItems: navObj });
		});
	});

	//////////* GET USERS PIQS PAGE *//////////
	// router.get('/user/:username/piquancy', function(req, res, next) {
	// 	mongoose.model('users').find({username: req.params.username}, function(err, users) {
	// 		mongoose.model('piqs').find({user: users[0]._id}, function(err, piqs) {
	// 			setNav(req);
	// 			isNotLoggedIn(req, res);

	// 			res.render('mypiqs', { mypiqs: piqs, navItems: navObj });
	// 		});
	// 	});
	// });

	//////////* GET USER PROFILE PAGE *//////////
	router.get('/profile', function(req, res, next) {
		// Get user data from session id


		setNav(req);
		isNotLoggedIn(req, res);

		res.redirect('/user/jmz527', { navItems: navObj }); // <-- TODO: Redirect to Users Profile Page
	});


	//////////* GET LOGOUT *//////////
	router.get('/logout', function(req, res, next) {
		// setNav(req);

		// Clear the session
		req.session.userId = null;

		// Redirect to login page
		isNotLoggedIn(req, res);
		res.redirect('/');
	});

//____POST ROUTES________________________________________________//

	//////////* POST USER REGISTRATION *//////////
	router.post('/register', function(req, res, next) {
		mongoose.model('users').find(function(err, users, usersSchema) {
			setNav(req);
			isLoggedIn(req, res);

			var submission = req.body;
			delete submission.password;

			// Hash the users password synchronously:
			var password = bcrypt.hashSync(submission.password_hash, 10);
			submission.password_hash = password;

			// Creates a user model
			var User = mongoose.model('users', usersSchema);

			// Creates a newUser object from the user model...
			var newUser = new User(submission);
			// ...saves it to the database
			newUser.save(function (err, newUser) {
				if (err) return console.error(err);
			});

		  res.redirect('/');
		});
	});

	//////////* POST USER LOGIN *//////////
	router.post('/login', function(req, res, next) {
		mongoose.model('users').find({username: req.body.username}, function(err, users) {
			setNav(req);
			isLoggedIn(req, res);

			// Compares the login password to the hashed password
			pass = bcrypt.compareSync(req.body.password, users[0].password_hash);

			// If the passwords match...
			if (pass) {
				// ...start user session
				req.session.userId = users[0]._id;

				res.redirect('/users'); // <-- TODO: Redirect to Profile
			}
			else {
				// console.log('Something went wrong...');
			}
		});
	});

	//////////* POST PIQ SUBMISSION *//////////
	router.post('/add_piq', function(req, res, next) {
		mongoose.model('users').find({_id: req.session.userId}, function(err, users) {
			mongoose.model('piqs').find(function(err, piqs, piqsSchema) {
				setNav(req);
				isNotLoggedIn(req, res);

				var piq = req.body;
				piq.u_id = users[0]._id;

				// Creates a Piq model
				var Piq = mongoose.model('piqs', piqsSchema);
				// Makes a newPiq object from the model...
				var newPiq = new Piq(piq);
				// ...and saves it to the database
				newPiq.save(function (err, newPiq) {
					if (err) return console.error(err);
				});

			  res.redirect('/');
			});
		});
	});

//____EDIT ROUTES________________________________________________//

	//////////* UPDATE USER REGISTRATION  *//////////
	// router.put('/update', function(req, res, next) {
	// 	setNav(req);
	// 	isNotLoggedIn(req, res);

		//Save changes to the database

		//Redirect to the Users Profile Page
	// 	res.redirect('/');
	// });

	//////////* RESET PASSWORD *//////////
	// router.put('/reset', function(req, res, next) {
		// setNav(req);
		// isNotLoggedIn(req, res);

		//Save changes to the database

		//Redirect to the Login Page
		// res.redirect('/');
	// });

//____DELETE ROUTES________________________________________________//

	//////////* DELETE USER PIQ *//////////
	// router.delete('/piq/:piq_id/delete', function(req, res, next) {
	// 	setNav(req);
	// 	isNotLoggedIn(req, res);

	// 	// Delete piq from the database

	// 	// Redirect to the Profile Page
	// 	res.redirect('/');
	// });


	//////////* DELETE USER *//////////
	// router.delete('/user/:username/delete', function(req, res, next) {
	// 	setNav(req);
	// 	isNotLoggedIn(req, res);

	// 	// Delete from the database

	// 	// Redirect to the Profile Page
	// 	res.redirect('/');
	// });


//____AJAX ROUTES________________________________________________//

	//////////* AJAX GET PIQS *//////////
	router.get('/ajax', function(req, res) {
		mongoose.model('piqs').find(function(err, piqs) {
			piqsData = piqs;

		  res.send(piqsData);
		});
	});

	//////////* AJAX GET USER PIQUANCY  *//////////
	router.get('/ajax/piquancy', function(req, res) {
		mongoose.model('piqs').find({u_id: req.session.userId}, function(err, piqs) {
			myPiqs = piqs;

			// console.log(req);

			res.send(myPiqs);
		});
	});


	//////////* GET PIQ PAGE *//////////
	router.get('/piq/:piq_id', function(req, res, next) {
		mongoose.model('piqs').find({_id: req.params.piq_id}, function(err, piqs) {
			// Set up another callback to get the piq's user data
			setNav(req);
			isNotLoggedIn(req, res);

			// console.log(piqs);
			res.render('piq', { piq: piqs, navItems: navObj });
		});
	});


	//////////* AJAX GET USER PROFILE  *//////////
	router.get('/ajax/profile', function(req, res) {
		mongoose.model('users').find({_id: req.session.userId}, function(err, users) {
			profileID = users[0]._id;

			mongoose.model('piqs').find({u_id: profileID}, function(err, piqs) {
				thisUser = users[0];
				myPiqs = piqs;

				// console.log(thisUser);
				// console.log(myPiqs);

				res.send({ user: thisUser, piqs: myPiqs });
			});
		});
	});


	// //////////* AJAX GET SINGLE PIQ  *//////////
	// router.get('/ajax/piq', function(req, res) {
	// 	// console.log(req.params.piq_id);
	// 	// piqID = req.params.piq_id;
	// 	piqID = "559a38661a7a3edae74a9b23";
	// 	console.log(piqID);

	// 	mongoose.model('piqs').find({_id: piqID}, function(err, piqs) {
	// 	// mongoose.model('piqs').find({_id: piqID}, function(err, piqs) {
	// 	// mongoose.model('piqs').find({_id: ObjectId(req.params.piq_id) }, function(err, piqs) {
	// 		thisPiq = piqs[0];

	// 		// console.log(req.params);
	// 		// console.log(req.params.piq_id);
	// 		console.log(thisPiq);
	// 		// console.log(piqs);

	// 		res.send({ piq: piqs });
	// 	});
	// });	


//____END OF ROUTES________________________________________________//
module.exports = router;