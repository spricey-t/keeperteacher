

var User = require('mongoose').model('user');
var authService = require('../auth/auth.service');
var credentialService = require('../auth/credential.service');

exports.findUserById = findUserById; // (userId) -> user
exports.findUserByEmail = findUserByEmail // (email) -> user
exports.listUsers = listUsers; // () -> [user]
exports.saveUser = saveUser; // (user) -> user
exports.deleteUser = deleteUser; // (user) -> user



function findUserById(id) {
	return new Promise(function(resolve, reject) {
		User.findOne({ _id: id }, function(err, res) {
			if(err) reject(err);
			else resolve(res);
		});
	});
}

function findUserByEmail(email) {
	return new Promise(function(resolve, reject) {
		User.findOne({ email: email }, function(err, res) {
			if(err) reject(err);
			else resolve(res);
		});
	});
}

function listUsers() {
	return new Promise(function(resolve, reject) {
		User.find({})
		.sort('firstName')
		.exec(function(err, users) {
			if(err) reject(err);
			else resolve(users);
		});
	});
}

function saveUser(user) {
	return new Promise(function(resolve, reject) {
		var persisted = new User(user);
		persisted.save(function(err, user) {
			// todo check for duplicate email?
			if(err) reject(err);
			else resolve(user);
		});
	});
}

function deleteUser(user) {
	return new Promise(function(resolve, reject) {
		user.remove(function(err) {
			if(err) reject(err);
			else resolve(user);
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
