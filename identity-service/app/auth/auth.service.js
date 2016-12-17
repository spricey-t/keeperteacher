

var winston = require('winston');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
var config = require('config');
var userService = require('../users/user.service');
var credentialService = require('./credential.service');

var jwtSecret = config.get('jwt.secret');


exports.authenticate = authenticate; // (email, cleartextPassword) -> { user, token }
exports.authorize = authorize; // (user, desired group)
exports.validatePassword = validatePassword; // (password) -> true / false
exports.hashPassword = hashPassword; // (password)
exports.comparePassword = comparePassword; // (cleartext, hashed)
exports.generateToken = generateToken; // (userId)
exports.resolveToken = resolveToken; // (token) -> user


function authenticate(email, cleartextPassword) {
    return new Promise(function(resolve, reject) {
        userService.findUserByEmail(email)
        .then(function(user) {
            credentialService.getCredsForUser(user.id)
            .then(function(creds) {
                comparePassword(cleartextPassword, creds.password)
                .then(function(isMatched) {
                    if(!isMatched) reject({ err: 'authentication failed' });
                    else {
                        generateToken(user.id)
                        .then(function(token) {
                            resolve({ user: user, token: token });
                        });
                    }
                });
            });
        })
        .catch(function(err) {
            reject(err);
        });
    });
}

function authorize(user, requiredGroup) {
    return new Promise(function(resolve, reject) {
        if(user && user.groups && user.groups.indexOf(requiredGroup) > -1) {
            resolve(requiredGroup);
        } else {
            reject({ err: 'unauthorized' });
        }
    });
}

function validatePassword(password) {
    return password && password.length > 4 && password.length < 20;
}

function hashPassword(password) {
    return new Promise(function(resolve, reject) {
        bcrypt.genSalt(10, function(err, salt) {
            if(err) reject(err);
            else {
                bcrypt.hash(password, salt, function(err, hash) {
                    if(err) reject(err);
                    else resolve(hash);
                });
            }
        });
    });
}

function comparePassword(cleartext, hashed) {
    return new Promise(function(resolve, reject) {
        bcrypt.compare(cleartext, hashed, function(err, isMatched) {
            if(err) reject(err);
            else resolve(isMatched);
        });
    });
}

function generateToken(userId) {
    return new Promise(function(resolve, reject) {
        var token = jwt.sign({ userId: userId }, jwtSecret);
        resolve(token);
    });
}

function resolveToken(token) {
    return new Promise(function(resolve, reject) {
        jwt.verify(token, jwtSecret, function(err, decoded) {
            if(err) reject(err);
            else {
                userService.findUserById(decoded.userId)
                .then(function(user) {
                    resolve(user);
                })
                .catch(function(err) {
                    reject(err);
                });
            }
        });
    });
}
