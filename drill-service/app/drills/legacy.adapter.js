
const request = require('sync-request');
const config = require('config');

const legacyApi = config.get('legacy.endpoint');
const email = config.get('legacy.email');
const password = config.get('legacy.password');

exports.createLegacyDrill = createLegacyDrill;



function createLegacyDrill(drill) {
    return new Promise((resolve, reject) => {
        getLegacyToken().then((token) => {
            let res = request('POST', legacyApi + "/api/drills", {
                headers: {
                    'x-access-token': token
                },
                json: {
                    drillName: drill.name,
                    objective: drill.objective,
                    category: drill.category,
                    url: drill.videoUrl,
                    schematic: drill.schematicUrl
                }
            });
            if(res.statusCode >= 300) {
                reject({ err: 'failed to create legacy drill ' + res.statusCode});
            } else {
                resolve(JSON.parse(res.getBody()));
            }
        });
    });
}

function getLegacyToken() {
    return new Promise((resolve, reject) => {
        var res = request('POST', legacyApi + "/authenticate", {
            json: {
                email: email,
                password: password
            }
        });
        if(res.statusCode >= 300) {
            reject({ err: 'failed to get token: ' + res.statusCode });
        } else {
            resolve(JSON.parse(res.getBody()).token);
        }
    });
}