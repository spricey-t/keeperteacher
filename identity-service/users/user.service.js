

var User = require('mongoose').model('user');
var authService = require('../auth/auth.service');

exports.findUserById = findUserById;
exports.listUsers = listUsers;
exports.createUser = createUser;



function findUserById(id) {
	return new Promise(function(resolve, reject) {
		User.findOne({ _id: id }, '-password -salt', function(err, res) {
			if(err) reject(err);
			else resolve(res);
		});
	});
}

function listUsers() {
	return new Promise(function(resolve, reject) {
		User.find({})
		.sort('firstName')
		.select('-password -salt')
		.exec(function(err, users) {
			if(err) reject(err);
			else resolve(users);
		});
	});
}

function createUser(user) {
	return new Promise(function(resolve, reject) {
		validatePassword(user.password)
		.then(authService.hashPassword)
		.then(function(hashedPassword) {

			user.groups = ['standard']; // always force standard for now
			user.password = hashedPassword;

			var persisted = new User(user);
			persisted.save(function(err) {
				if(err) reject(err);
				else {
					user.password = undefined;
					resolve(user);
				}
			});
		})
		.catch(function(err) {
			reject(err);
		});
	});
}

function validatePassword(password) {
	return new Promise(function(resolve, reject) {
		if(!password || password.length < 4) {
			reject({ msg: 'password is required and must be at least 4 characters in length' });
		} else {
			resolve(password);
		}
	});
}
