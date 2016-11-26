

const winston = require('winston');
const express = require('express');
const config = require('config');

const app = express();
const port = config.get('server.port');


app.use(express.static('client/admin_ui/build/web/'));
app.use('/lib', express.static('client/lib/'));

app.listen(port, () => {
	winston.info('server started on port', port);
});
