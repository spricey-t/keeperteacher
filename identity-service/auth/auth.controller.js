

var winston = require('winston');
var authService = require('./auth.service');


exports.authenticate = function(req, res, next) {
	authService.authenticate(req.body.email, req.body.password)
	.then(function(tokenRes) {
		res.json(tokenRes);
	})
	.catch(function(err) {
		winston.error('authentication failed', err);
		res.status(403).send(err);
	});
};

exports.resolveToken = function(req, res, next) {
	authService.resolveToken(req.headers['x-auth-token'])
	.then(function(user) {
		req.bus.user = user;
		next();
	})
	.catch(function(err) {
		winston.error('token resolve error', err);
		res.status(403).send(err);
	});
};

exports.tokenTest = function(req, res, next) {
	res.status(200).send();
};
