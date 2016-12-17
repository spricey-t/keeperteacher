

var winston = require('winston');
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

// register user model
require('./users/user.model');
require('./auth/credential.model');

var userService = require('./users/user.service');
var credentialService = require('./auth/credential.service');

var admin = {
    firstName: "John",
    lastName: "Smith",
    email: "john@example.com",
    password: "password",
    groups: [
        "standard",
        "admin"
    ]
};

function seedAdmin() {
    userService.saveUser(admin)
    .then(function(user) {
        credentialService.saveCredsForUser(user.id, admin.password)
        .then(function(creds) {
        });
    });
}

seedAdmin();
/*.catch(function(err) {
winston.error(err);
});*/
