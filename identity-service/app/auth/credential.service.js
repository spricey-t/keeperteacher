


var Creds = require('mongoose').model('credential');
var authService = require('./auth.service');


exports.getCredsForUser = getCredsForUser;  // (userId) -> creds
exports.saveCredsForUser = saveCredsForUser; // (userId, cleartextPassword) -> creds
exports.deleteCreds = deleteCreds; // (creds) -> creds



function getCredsForUser(userId) {
	return new Promise(function(resolve, reject) {
		Creds.findOne({ userId: userId }, function(err, creds) {
			if(err) reject(err);
			else resolve(creds);
		});
	});
}

function saveCredsForUser(userId, cleartextPassword) {
	return new Promise(function(resolve, reject) {
		if(!authService.validatePassword(cleartextPassword)) {
			reject({ err: 'password is required and must be between 4 and 20 characters'});
			return;
		}
		authService.hashPassword(cleartextPassword)
		.then(function(hashedPassword) {
			var creds = new Creds({ userId: userId, password: hashedPassword });
			creds.save(function(err, creds) {
				if(err) reject(err);
				else resolve(creds);
			});
		})
		.catch(function(err) {
		});
	});
}

function deleteCreds(creds) {
	return new Promise(function(resolve, reject) {
		creds.remove(function(err) {
			if(err) reject(err);
			else resolve(creds);
		});
	});
}
