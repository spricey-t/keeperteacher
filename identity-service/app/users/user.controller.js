
var winston = require('winston');
var userService = require('./user.service');


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
	userService.createUser(req.body)
	.then(function(user) {
		res.json(user);
	})
	.catch(function(err) {
		res.status(400).send(err);
	});
};
