

const winston = require('winston');
const drillService = require('./drill.service');
const legacyAdapter = require('./legacy.adapter');


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
    var saveDrill = function() {
        drillService.saveDrill(req.body).then(drill => {
            res.json(drill);
        }).catch(err => {
            res.status(400).send(err);
        });
    };

    if(req.query.legacy) {
        legacyAdapter.createLegacyDrill(req.body).then(legacyDrill => {
            req.body.legacyId = legacyDrill._id;
            saveDrill();
        }).catch(err => {
            res.status(400).send(err);
        });
    } else {
        saveDrill();
    }
};

exports.updateDrill = (req, res, next) => {
    drillService.findDrillById(req.params.drillId)
    .then(drill => {
        return new Promise(function(resolve, reject) {
            drill.name = req.body.name || drill.name;
            drill.category = req.body.category || drill.category;
            drill.objective = req.body.objective || drill.objective;
            drill.schematicUrl = req.body.schematicUrl || drill.schematicUrl;
            drill.videoUrl = req.body.videoUrl || drill.videoUrl;
            resolve(drill);
        });
    })
    .then(drill => {
        return new Promise((resolve, reject) => {
            if(req.query.legacy && drill.legacyId) {
                legacyAdapter.updateLegacyDrill(drill).then((legacyDrill) => {
                    resolve(drill);
                }).catch(err => {
                    reject(err);
                });
            } else {
                resolve(drill);
            }
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
    .then((drill) => {
        return new Promise((resolve, reject) => {
            if(req.query.legacy && drill.legacyId) {
                legacyAdapter.deleteLegacyDrill(drill.legacyId).then((legacyDrill) => {
                    resolve(drill);
                }).catch(err => {
                    reject(err);
                });
            } else {
                resolve(drill);
            }
        });
    })
    .then(drillService.deleteDrill)
    .then(drill => {
        res.json(drill);
    })
    .catch(err => {
        winston.warn(err);
        res.status(404).send();
    });
};
