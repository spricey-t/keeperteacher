

const winston = require('winston');
const express = require('express');
const mongoose = require('mongoose');
const config = require('config');


const app = express();
const port = config.get('server.port');


app.listen(port, () => {
	winston.info('server started on port', port);
});
