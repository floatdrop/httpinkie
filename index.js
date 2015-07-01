'use strict';

var http = require('http');
var https = require('https');
var Promise = require('pinkie-promise');
var timedOut = require('timed-out');
var isStream = require('is-stream');

module.exports.request = function request(request) {
	var fn = request.protocol === 'https:' ? https : http;

	return new Promise(function (resolve, reject) {
		var req = fn.request(request, function (response) {
			resolve(response);
		});

		req.once('error', reject);

		if (request.timeout) {
			timedOut(req, request.timeout);
		}

		if (isStream.readable(request.body)) {
			request.body.pipe(req);
			return;
		}

		req.end(request.body);
	});
};
