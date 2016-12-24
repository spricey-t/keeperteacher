
const request = require('request');
const config = require('config');

const legacyApi = config.get('legacy.endpoint');
const email = config.get('legacy.email');
const password = config.get('legacy.password');

exports.createLegacyDrill = createLegacyDrill;
exports.deleteLegacyDrill = deleteLegacyDrill;



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
                body: {
                    drillName: drill.name,
                    objective: drill.objective,
                    category: drill.category,
                    url: drill.videoUrl,
                    schematic: drill.schematicUrl || "http://.com"
                }
            }, (err, response, body) => {
                if(err || response.statusCode >= 300) {
                    reject({ err: 'failed to create legacy drill ' + response.statusCode, body: body })
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
}

function getLegacyToken() {
    return new Promise((resolve, reject) => {
        request({
            url: legacyApi + '/authenticate',
            method: 'POST',
            json: true,
            body: {
                email: email,
                password: password
            }
        }, (err, response, body) => {
            if(err || response.statusCode >= 300) {
                reject({ err: 'failed to get token ' + response.statusCode + ' ' + err });
            } else {
                resolve(body.token);
            }
        });
    });
}