

var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({

	firstName: {
		type: String,
		trim: true,
		required: 'first name is required',
		validate: [
			function(firstName) {
				return firstName.length > 0 && firstName.length < 50;
			},
			'first name must be between 0 and 50 characters'
		]
	},
	lastName: {
		type: String,
		trim: true,
		required: 'last name is required',
		validate: [
			function(lastName) {
				return lastName.length > 0 && lastName.length < 50;
			},
			'first name must be between 0 and 50 characters'
		]
	},
	email: {
                type: String,
                lowercase: true,
                trim: true,
                required: 'Please enter an email',
                match: [/^([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22))*\x40([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d))*$/, 'Please enter a correct email format']
        },
	password: String,
	groups: [{
		type: String,
		enum: ['standard', 'admin'],
		default: 'standard'
	}],
	created: {
		type: Date,
		default: Date.now
	}
});

mongoose.model('user', UserSchema);
