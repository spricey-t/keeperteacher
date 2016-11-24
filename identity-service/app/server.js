
/* Services */
var winston = require('winston');
var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var mongoose = require('mongoose');
var config = require('config');

var contextPath = '/api/v2'
var servletPath = '/identityservice'

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
require('./auth/credential.model');

/* Load Controllers */
var userController = require('./users/user.controller');
var authController = require('./auth/auth.controller');

app.use(function(req, res, next) {
	req.bus = {};
	next();
});

/* User Routes */
var userRouter = express.Router();
userRouter.use(authController.requiresAuthn);
userRouter.use(authController.resolveToken);
userRouter.use(authController.adminAuthz);
userRouter.get('/', userController.listUsers);
userRouter.post('/', userController.createUser);
userRouter.put('/:userId', userController.updateUser);
userRouter.delete('/:userId', userController.deleteUser);
app.use(contextPath + servletPath + '/users', userRouter);

/* Auth Routes */
var authRouter = express.Router();
authRouter.post('/authenticate', authController.authenticate);
authRouter.get('/token/test', authController.resolveToken, authController.tokenTest);
/*
app.route('/authenticate')
	.post(authController.authenticate);
app.route('/token/test')
	.get(authController.resolveToken, authController.tokenTest);
*/
app.use(contextPath + servletPath + '/auth', authRouter);


app.listen(port, function() {
	winston.info('server started on port', port);
});
