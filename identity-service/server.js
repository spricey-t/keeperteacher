
/* Services */
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

/* User Routes */
app.route('/api/users')
	.get(userController.listUsers)
	.post(userController.createUser);

app.listen(port, function() {
	console.log('listening on port ' + port);
});
