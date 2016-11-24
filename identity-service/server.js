
/* Services */
var winston = require('winston');
var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var mongoose = require('mongoose');
var config = require('config');


/* Configuration */
var app = express();
var port = config.get('server.port');
var dbHost = config.get('db.host');

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride());

mongoose.Promise = Promise;
mongoose.connect(dbHost);

/* Register Models */
require('./users/user.model');

/* Load Controllers */
var userController = require('./users/user.controller');
var authController = require('./auth/auth.controller');

app.use(function(req, res, next) {
	req.bus = {};
	next();
});

/* User Routes */
app.route('/api/users')
	.get(userController.listUsers)
	.post(userController.createUser);

/* Auth Routes */
app.route('/api/authenticate')
	.post(authController.authenticate);
app.route('/api/token/test')
	.get(authController.resolveToken, authController.tokenTest);

app.listen(port, function() {
	winston.info('server started on port', port);
});
