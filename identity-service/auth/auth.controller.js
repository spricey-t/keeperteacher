

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
