
const winston = require('winston');
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const config = require('config');

var contextPath = '/api/v2'
var servletPath = '/drillservice'

/* Configuration */
const app = express();
const port = config.get('server.port');
const dbHost = config.get('db.host');

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride());

mongoose.Promise = Promise;
mongoose.connect(dbHost);

/* Register Models */
require('./drills/drill.model');

/* Load Controllers */
const drillController = require('./drills/drill.controller');

/* Drill Routes */
const drillRouter = express.Router();
drillRouter.get('/', drillController.listDrills);
drillRouter.post('/', drillController.createDrill);
drillRouter.get('/:drillId', drillController.findDrillById);
drillRouter.put('/:drillId', drillController.updateDrill);
drillRouter.delete('/:drillId', drillController.deleteDrill);
app.use(contextPath + servletPath + '/drills', drillRouter);

app.listen(port, () => {
	winston.info('server started on port', port);
});
