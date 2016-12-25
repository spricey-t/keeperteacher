
const request = require('request');
const config = require('config');

const legacyApi = config.get('legacy.endpoint');
const email = config.get('legacy.email');
const password = config.get('legacy.password');

var legacyToken;

exports.createLegacyDrill = createLegacyDrill;
exports.deleteLegacyDrill = deleteLegacyDrill;
exports.updateLegacyDrill = updateLegacyDrill;



function createLegacyDrill(drill) {
    return new Promise((resolve, reject) => {
        getLegacyToken().then((token) => {
            request({
                url: legacyApi + '/api/drills',
                method: 'POST',
                headers: {
                    'x-access-token': token
                },
                json: true,
                body: convertDrillToLegacy(drill)
            }, (err, response, body) => {
                if(err || response.statusCode >= 300) {
                    reject({ err: 'failed to create legacy drill ' + response.statusCode, body: body });
                } else {
                    resolve(body);
                }
            });
        }).catch(err => {
            reject(err);
        });
    });
}

function deleteLegacyDrill(drillId) {
    return new Promise((resolve, reject) => {
        getLegacyToken().then((token) => {
            request({
                url: legacyApi + '/api/drills/' + drillId,
                method: 'DELETE',
                headers: {
                    'x-access-token': token
                },
                json: true
            }, (err, response, body) => {
                if(err || response.statusCode >= 300) {
                    reject(body);
                } else {
                    resolve(body);
                }
            });
        });
    });
}

function updateLegacyDrill(drill) {
    return new Promise((resolve, reject) => {
        getLegacyToken().then((token) => {
            request({
                url: legacyApi + '/api/drills/' + drill.legacyId,
                method: 'PUT',
                headers: {
                    'x-access-token': token
                },
                json: true,
                body: convertDrillToLegacy(drill)
            }, (err, response, body) => {
                if(err || response.statusCode >= 300) {
                    reject(body);
                } else {
                    resolve(body);
                }
            });
        });
    });
}

function getLegacyToken() {
    return new Promise((resolve, reject) => {
        if(legacyToken) {
            resolve(legacyToken);
        } else {
            request({
                url: legacyApi + '/authenticate',
                method: 'POST',
                json: true,
                body: {
                    email: email,
                    password: password
                }
            }, (err, response, body) => {
                if (err || response.statusCode >= 300) {
                    reject({err: 'failed to get token ' + response.statusCode + ' ' + err});
                } else {
                    legacyToken = body.token;
                    resolve(body.token);
                }
            });
        }
    });
}

function convertDrillToLegacy(drill) {
    return {
        drillName: drill.name,
        objective: drill.objective,
        category: drill.category,
        url: drill.videoUrl,
        schematic: drill.schematicUrl || "http://.com"
    };
}