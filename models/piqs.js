var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var piqsSchema = new Schema({
	color: String,
	user: {
		type: Schema.ObjectId,
		ref: 'users'
	}
});

mongoose.model('piqs', piqsSchema);
