

var winston = require('winston');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
var config = require('config');
var User = require('mongoose').model('user');

var jwtSecret = config.get('jwt.secret');


exports.authenticate = authenticate; // (email, password) -> { user, token }
exports.authorize = authorize; // (user, desired group)
exports.hashPassword = hashPassword; // (password)
exports.comparePassword = comparePassword; // (cleartext, hashed)
exports.generateToken = generateToken; // (userId)
exports.resolveToken = resolveToken; // (token) -> user


function authenticate(email, password) {
	return new Promise(function(resolve, reject) {
		User.findOne({ email: email }, function(err, user) {
			if(err) reject(err);
			else {
				comparePassword(password, user.password)
				.then(function(isMatched) {
					if(!isMatched) reject({ err: 'authentication failed' }); //todo replace with common error model
					else {
						generateToken(user.id)
						.then(function(token) {
							user.password = undefined;
							resolve({ user: user, token: token });
						})
						.catch(function(err) {
							reject(err);
						});
					}
				})
				.catch(function(err) {
					reject(err);
				});
			}
		});
	});
}

function authorize(user, requiredGroup) {
	return new Promise(function(resolve, reject) {
		if(user && user.groups && user.groups.indexOf(requiredGroup) > -1) {
			resolve(requiredGroup);
		} else {
			reject({ err: 'unauthorized' });
		}
	});
}

function hashPassword(password) {
	return new Promise(function(resolve, reject) {
		bcrypt.genSalt(10, function(err, salt) {
			if(err) reject(err);
			else {
				bcrypt.hash(password, salt, function(err, hash) {
					if(err) reject(err);
					else resolve(hash);
				});
			}
		});
	});
}

function comparePassword(cleartext, hashed) {
	return new Promise(function(resolve, reject) {
		bcrypt.compare(cleartext, hashed, function(err, isMatched) {
			if(err) reject(err);
			else resolve(isMatched);
		});
	});
}

function generateToken(userId) {
	return new Promise(function(resolve, reject) {
		var token = jwt.sign({ userId: userId }, jwtSecret);
		resolve(token);
	});
}

function resolveToken(token) {
	return new Promise(function(resolve, reject) {
		jwt.verify(token, jwtSecret, function(err, decoded) {
			if(err) reject(err);
			else {
				User.findOne({ _id: decoded.userId }, '-password', function(err, user) {
					if(err) reject(err);
					else resolve(user);
				});
			}
		});
	});
}
