//Gems
//––––––––––––––––––––––––––––––––––––––––––––––––––//
var express = require('express');
var session = require('express-session');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require('fs');
var app = express();

//Enviornment
//––––––––––––––––––––––––––––––––––––––––––––––––––//
app.set('port', (process.env.PORT || 5000));

app.use(favicon(__dirname + '/public/images/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(require('less-middleware')(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

//Database Setup
//––––––––––––––––––––––––––––––––––––––––––––––––––//
var mongoose = require('mongoose');
var uriUtil = require('mongodb-uri');
var options = { server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } }, 
                replset: { socketOptions: { keepAlive: 1, connectTimeoutMS : 30000 } } };

// MongoLab db connection
//––––––––––––––––––––––––––––––––––––––––––––––––––//
var mongodbUri = process.env.MONGOLAB_URI||'mongodb://heroku_dl3q2qlc:vupcdr4m7cruacqpefodt3hiru@ds043388.mongolab.com:43388/heroku_dl3q2qlc';
var mongooseUri = uriUtil.formatMongoose(mongodbUri);

mongoose.connect(mongooseUri, options);

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));


// load all files in models dir
fs.readdirSync(__dirname + '/models').forEach(function(filename) {
  if (~filename.indexOf('.js')) require(__dirname + '/models/' + filename)
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


// Routes
//––––––––––––––––––––––––––––––––––––––––––––––––––//
var routes = require('./routes/index');
// var users = require('./routes/users');

app.use(session({
  secret: 'keyboard cat',
  // name: cookie_name,
  cookie: { maxAge: 60000},
//   store: sessionStore, // connect-mongo session store
//   proxy: true,
  saveUninitialized: true,
  resave: true
}));

app.use('/', routes);
// app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Error Handlers
//––––––––––––––––––––––––––––––––––––––––––––––––––//

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

module.exports = app;