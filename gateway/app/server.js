

const winston = require('winston');
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const config = require('config');
const proxy = require('express-http-proxy');
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

const app = express();
const port = config.get('server.port');
const identityserviceHost = config.get('identityservice.endpoint');
const drillserviceHost = config.get('drillservice.endpoint');

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride());


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

app.listen(port, () => {
	winston.info('server started on port', port);
});
