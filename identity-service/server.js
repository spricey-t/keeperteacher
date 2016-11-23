
var express = require('express');
var morgan = require('morgan');
var config = require('config');

var app = express();
var port = config.get('server.port');

app.use(morgan('dev'));

app.listen(port, function() {
	console.log('listening on port ' + port);
});
