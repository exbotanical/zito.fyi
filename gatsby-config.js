// `source-map-support` mimics node's stack trace and makes debugging easier
require('source-map-support').install();

require('ts-node').register({
	transpileOnly: true,
	files: true,
	ignore: ['(?:^|/).cache/', '(?:^|/)public/']
});

module.exports = require('./config/gatsby-config');
