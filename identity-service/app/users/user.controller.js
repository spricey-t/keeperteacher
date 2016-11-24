
var winston = require('winston');
var userService = require('./user.service');
var authService = require('../auth/auth.service');
var credentialService = require('../auth/credential.service');


exports.listUsers = function(req, res, next) {
	userService.listUsers()
	.then(function(users) {
		res.json(users);
	})
	.catch(function(err) {
		winston.log('error', 'error listing users', err);
		res.status(500).send(err);
	});
};

exports.createUser = function(req, res, next) {
	userService.saveUser(req.body)
	.then(function(user) {
		credentialService.saveCredsForUser(user.id, req.body.password)
		.then(function(creds) {
			res.json(user);
		})
		.catch(function(err) {
			winston.error('failed to create credentials for new user', err);
			user.remove(function(err2) {
				if(err2) {
					winston.error('cleanup of user failed', err2);
					res.status(500).send(err2);
				} else {
					res.status(400).send(err);
				}
			});
		});
	})
	.catch(function(err) {
		winston.warn('create user failed', err);
		res.status(400).send(err);
	});
};

exports.updateUser = function(req, res, next) {
	userService.findUserById(req.params.userId)
	.then(function(user) {
		translateUserData(user, req.body, req.bus.user)
		.then(userService.saveUser)
		.then(function(savedUser) {
			res.json(savedUser);
		})
		.catch(function(err) {
			winston.warn('update user failed', err);
			res.status(400).send(err);
		});
	})
	.catch(function(err) {
		res.status(404).send();
	});
};

exports.deleteUser = function(req, res, next) {
	userService.findUserById(req.params.userId)
	.then(function(user) {
		userService.deleteUser(user)
		.then(function(deletedUser) {
			credentialService.getCredsForUser(req.params.userId)
			.then(credentialService.deleteCreds)
			.then(function(creds) {
				res.json(deletedUser);
			})
			.catch(function(err) {
				winston.error('failed to delete creds after user deletion', err);
				res.json(deletedUser);
			});
		})
		.catch(function(err) {
			winston.error('delete user failed', err);
			res.status(500).send(err);
		});
	})
	.catch(function(err) {
		res.status(404).send();
	});
};

exports.findUserById = function(req, res, next) {
	userService.findUserById(req.params.userId)
	.then(function(user) {
		res.json(user);
	})
	.catch(function(err) {
		res.status(404).send();
	});
};



function translateUserData(existingUser, newUser, requestingUser) {
	return new Promise(function(resolve, reject) {
		authService.authorize(requestingUser, 'admin')
		.then(function(isAuthorized) {
			if(!isAuthorized  && requestingUser.id !== existingUser.id) reject({ err: 'unauthorized' });
			else {
				existingUser.firstName = newUser.firstName || existingUser.firstName;
				existingUser.lastName = newUser.lastName || existingUser.lastName;
				existingUser.email = newUser.email || existingUser.email;
				resolve(existingUser);
			}
		})
		.catch(function(err) {
			reject(err);
		});
	});
}
