

var winston = require('winston');
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

// register user model
require('./users/user.model');

var userService = require('./users/user.service');

var admin = {
	firstName: "John",
	lastName: "Smith",
	email: "john@example.com",
	password: "password",
	groups: [
		"standard",
		"admin"
	]
};

function seedAdmin() {
	return new Promise(function(resolve, reject) {
		userService.createUser(admin)
		.then(function(user) {
			resolve(user);
		})
		.catch(function(err) {
			reject(err);
		});
	});
}

seedAdmin()
.then(winston.info('admin user seeded'));
/*.catch(function(err) {
	winston.error(err);
});*/
