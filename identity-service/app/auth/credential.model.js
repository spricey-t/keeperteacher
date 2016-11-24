

var mongoose = require('mongoose');


var CredentialsSchema = new mongoose.Schema({
	userId: String,
	password: String
});


mongoose.model('credential', CredentialsSchema);
