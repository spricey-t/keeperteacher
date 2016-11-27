

const winston = require('winston');
const express = require('express');
const morgan = require('morgan');
const config = require('config');
const cors = require('cors');

const app = express();
const port = config.get('server.port');

app.use(morgan('dev'));
app.use(cors());

app.use(express.static('client/admin_ui/build/web/'));
app.use('/lib', express.static('client/lib/'));

app.listen(port, () => {
	winston.info('server started on port', port);
});
