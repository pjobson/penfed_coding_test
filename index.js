'use strict';

// Node External Modules
var express     = require('express')             // https://github.com/expressjs/express
var proxy       = require('express-http-proxy'); // https://github.com/villadora/express-http-proxy
var geoIP       = require('geoip-lite');         // https://github.com/bluesmoon/node-geoip
var rp          = require('request-promise');    // https://github.com/request/request-promise
// Built in Node Modules
var path        = require('path');               // https://nodejs.org/api/path.html
var querystring = require('querystring');        // https://nodejs.org/api/querystring.html

// Init the application.
var app         = express();

// Allows access to public/
app.use(express.static('public'));

// Stand up an express server and listen on port 8081
// To view go to: http://localhost/
app.listen(8081, function () {
	console.log(Date.now());
	console.log("PenFed test app listening at http://localhost:8081");
});
// Route for /
// There could be more routes if the app was larger.
app.get('/', function (request, result) {
	console.log('Getting /');
	// send the index.html file back out.
	result.sendFile(path.join(__dirname + '/index.html'));
});
// Reverse Proxy for Yahoo's Weather Service
app.use("/yahooWeather", proxy('query.yahooapis.com', {
	forwardPathAsync: function() {
		console.log('Getting /yahooWeather');
		return new Promise(function(resolve, reject) {
			var externalIpAddress = false;

			// Lookup your external IP Address
			console.log('Looking Up Your External IP Address');

			rp('http://ifconfig.io/ip')
				.catch(function (err) {
					// handle error here in production env
				})
				.then(function (data) {
					// Trim the results from the response.
					externalIpAddress = data.trim();

					// Get your geographic info from the IP address.
					// This will probably fail for non-US locations and
					// the API may return something weird, as this is an
					// example it doesn't really matter that much.
					console.log('Geo Locating Your IP Address');
					var geo   = geoIP.lookup(externalIpAddress);

					// These should be pretty straight forward
					var city  = geo.city.toLowerCase();
					var state = geo.region.toLowerCase();

					// These are the required query string parameters
					var qs = {
						q:      'select * from weather.forecast where woeid in (select woeid from geo.places(1) where text="'+ city +', '+ state +'")',
						format: 'json',
						env:    'store://datatables.org/alltableswithkeys'
					};

					// Build the path, I'd probably just stuff this
					// into the resolver below, but I wanted to make it
					// more readable
					var path = '/v1/public/yql?'+querystring.stringify(qs)

					// Resolve the promise
					console.log('Resolving Promise');
					resolve(path);
				});
		});
	}
}));

