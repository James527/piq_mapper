var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var Schema = mongoose.Schema;

var usersSchema = mongoose.Schema({
	username: String,
	password_hash: String,
	name: String,
	email: String
});
usersSchema.plugin(timestamps);

mongoose.model('users', usersSchema);