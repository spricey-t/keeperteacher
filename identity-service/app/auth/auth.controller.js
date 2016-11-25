

var winston = require('winston');
var authService = require('./auth.service');

exports.requiresAuthn = function(req, res, next) {
	var token = req.headers['x-auth-token'];
	if(!token) {
		res.status(403).send({ err: 'full authentication is required' });
	} else {
		req.bus.token = token;
		next();
	}
};

exports.adminAuthz = function(req, res, next) {
	authService.authorize(req.bus.user, 'admin')
	.then(function(group) {
		next();
	})
	.catch(function(err) {
		res.status(403).send(err);
	});
};

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
	if(!req.bus.token) {
		res.status(403).send({ err: 'cannot resolve missing token' });
		return;
	}
	authService.resolveToken(req.bus.token)
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
	res.json(req.bus.user);
};
