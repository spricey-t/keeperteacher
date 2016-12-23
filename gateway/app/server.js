

const winston = require('winston');
const express = require('express');
const morgan = require('morgan');
const config = require('config');
const proxy = require('express-http-proxy');
const cors = require('cors');
const url = require('url');
const request = require('sync-request');
const route = require('path-match')({
    sensitive: false,
    strict: false,
    end: false,
});

const contextPath = '/api/v2';
const identityservicePath = '/identityservice';
const drillservicePath = '/drillservice';
const videoservicePath = '/videoservice';

const app = express();
const port = config.get('server.port');
const identityserviceHost = config.get('identityservice.endpoint');
const drillserviceHost = config.get('drillservice.endpoint');
const videoserviceHost = config.get('videoservice.endpoint');

app.use(morgan('dev'));
app.use(cors());

const resolveToken = (token) => {
    if(!token) {
        return null;
    }
    try {
        var res = request('GET', identityserviceHost + contextPath + identityservicePath + '/auth/token/test', {
            'headers': {
                'x-auth-token': token
            }
        });
        return JSON.parse(res.getBody('utf8'));
    } catch(e) {
        return null;
    }
};

const userAuthorized = (user, group) => {
    if(!user || !user.groups || user.groups.length == 0) return false;
    return user.groups.indexOf(group) > 0;
};

/* identityservice rules */
app.use(contextPath + identityservicePath, proxy(identityserviceHost, {
    forwardPath: (req, res) => {
        return contextPath + identityservicePath + url.parse(req.url).path;
    },
    decorateRequest: (proxyReq, origReq) => {
        return proxyReq;
    }
}));

/* drillservice rules */
app.use(contextPath + drillservicePath, proxy(drillserviceHost, {
    filter: (req, res) => {
        var user = resolveToken(req.headers['x-auth-token']);
        var path = url.parse(req.url).path;

        if(
            route('/drills')(path) && req.method !== 'GET' && !userAuthorized(user, 'admin') ||
            route('/drills/:drillId')(path) && req.method !== 'GET' && !userAuthorized(user, 'admin')
        ) {
            res.status(403).send({ err: 'unauthorized' });
            return false;
        } else {
            return true;
        }
    },
    forwardPath: (req, res) => {
        return contextPath + drillservicePath + url.parse(req.url).path;
    },
    decorateRequest: (proxyReq, origReq) => {
        return proxyReq;
    }
}));

/* videoservice rules */
app.use(contextPath + videoservicePath, proxy(videoserviceHost, {
    reqAsBuffer: true,
    limit: '250mb',
    reqBodyEncoding: null,
    filter: (req, res) => {
        console.log('testing req: ' + JSON.stringify(req.headers));
        var user = resolveToken(req.headers['x-auth-token']);
        var path = url.parse(req.url).path;

        if(
            route('/videos')(path) && !userAuthorized(user, 'admin')
        ) {
            res.status(403).send({ err: 'unauthorized' });
            return false;
        } else {
            return true;
        }
    },
    forwardPath: (req, res) => {
        return contextPath + videoservicePath + url.parse(req.url).path;
    },
    decorateRequest: (proxyReq, origReq) => {
        return proxyReq;
    }
}));

app.listen(port, () => {
    winston.info('server started on port', port);
});
