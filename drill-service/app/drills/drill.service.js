

const Drill = require('mongoose').model('drill');


exports.findDrillById = findDrillById; // (drillId) -> drill
exports.listDrills = listDrills; // () -> [drill]
exports.saveDrill = saveDrill; // (drill) -> drill
exports.deleteDrill = deleteDrill; // (drill) -> drill

function findDrillById(drillId) {
	return new Promise(function(resolve, reject) {
		Drill.findOne({ _id: drillId }, (err, drill) => {
			if(err) reject(err);
			else resolve(drill);
		});
	});
}

function listDrills() {
	return new Promise(function(resolve, reject) {
		Drill.find({})
		.sort('name')
		.exec((err, drills) => {
			if(err) reject(err);
			else resolve(drills);
		});
	});
}

function saveDrill(drill) {
	return new Promise(function(resolve, reject) {
		var formatted = new Drill(drill);
		formatted.save((err, persisted) => {
			if(err) reject(err);
			else resolve(persisted);
		});
	});
}

function deleteDrill(drill) {
	return new Promise(function(resolve, reject) {
		drill.remove((err) => {
			if(err) reject(err);
			else resolve(drill);
		});
	});
}
