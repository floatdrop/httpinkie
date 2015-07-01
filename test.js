/* global before, it, after */

'use strict';

var http = require('http');
var assert = require('assert');
var from2Array = require('from2-array');
var readAllStream = require('read-all-stream');
var httpinkie = require('./');

it('should make request to http host', function (done) {
	httpinkie.request({host: 'google.com'}).then(function (res) {
		assert.equal(res.statusCode, 301);
		done();
	}, done);
});

it('should make request to https host', function (done) {
	httpinkie.request({protocol: 'https:', host: 'google.com'}).then(function (res) {
		assert.equal(res.statusCode, 301);
		done();
	}, done);
});

var s;
before(function (done) {
	s = http.createServer(function (req, res) {
		res.writeHead(200);
		req.pipe(res);
	}).listen(6767, done);
});

it('should send string body to server', function (done) {
	httpinkie.request({host: 'localhost', method: 'POST', port: 6767, body: 'string'})
		.then(function (res) {
			res.on('data', function (chunk) {
				assert.equal(chunk.toString(), 'string');
				done();
			});
		}, done);
});

it('should send stream body to server', function (done) {
	httpinkie.request({host: 'localhost', method: 'POST', port: 6767, body: from2Array(['s', 't', 'r', 'e', 'a', 'm'])})
		.then(readAllStream)
		.then(function (body) {
			assert.equal(body, 'stream');
			done();
		})
		.catch(done);
});

after(function (done) {
	s.close(done);
});
