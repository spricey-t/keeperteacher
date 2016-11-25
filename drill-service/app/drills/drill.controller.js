

const winston = require('winston');
const drillService = require('./drill.service');


exports.listDrills = (req, res, next) => {
	drillService.listDrills()
	.then(drills => {
		res.json(drills);
	})
	.catch(err => {
		winston.error('list drills failed', err);
		res.status(500).send(err);
	});
};

exports.findDrillById = (req, res, next) => {
	drillService.findDrillById(req.params.drillId)
	.then(drill => {
		res.json(drill);
	})
	.catch(err => {
		res.status(404).send();
	});
};

exports.createDrill = (req, res, next) => {
	drillService.saveDrill(req.body)
	.then(drill => {
		res.json(drill);
	})
	.catch(err => {
		res.status(400).send(err);
	});
};

exports.updateDrill = (req, res, next) => {
	drillService.findDrillById(req.params.drillId)
	.then(drill => {
		return new Promise(function(resolve, reject) {
			drill.name = req.body.name || drill.name;
			drill.url = req.body.url || drill.url;
			resolve(drill);
		});
	})
	.then(drillService.saveDrill)
	.then(drill => {
		res.json(drill);
	})
	.catch(err => {
		winston.warn(err);
		res.status(400).send(err);
	});
};

exports.deleteDrill = (req, res, next) => {
	drillService.findDrillById(req.params.drillId)
	.then(drillService.deleteDrill)
	.then(drill => {
		res.json(drill);
	})
	.catch(err => {
		winston.warn(err);
		res.status(404).send();
	});
};
