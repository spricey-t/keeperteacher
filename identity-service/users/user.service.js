

var User = require('mongoose').model('user');

exports.findUserById = findUserById;
exports.listUsers = listUsers;
exports.createUser = createUser;



function findUserById(id) {
	return new Promise(function(resolve, reject) {
		User.findOne({ _id: id }, '-password -salt', function(err, res) {
			if(err) reject(err);
			else resolve(res);
		});
	});
}

function listUsers() {
	return new Promise(function(resolve, reject) {
		User.find({})
		.sort('firstName')
		.select('-password -salt')
		.exec(function(err, users) {
			if(err) reject(err);
			else resolve(users);
		});
	});
}

function createUser(user) {
	return new Promise(function(resolve, reject) {
			user.groups = ['standard']; // always force standard for now
			var persisted = new User(user);
			persisted.save(function(err) {
				if(err) reject(err);
				else resolve(user);
			});
	});
}
