var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var piqsSchema = new Schema({
	color: String,
	user: {
		type: Schema.ObjectId,
		ref: 'users'
	}
});

var Piq = mongoose.model('piqs', piqsSchema);
