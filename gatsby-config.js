// `source-map-support` mimics node's stack trace and makes debugging easier
require('source-map-support').install();

require('ts-node').register({
  files: true,
  ignore: ['(?:^|/).cache/', '(?:^|/)public/'],
  transpileOnly: true
});

module.exports = require('./config/gatsby-config');
