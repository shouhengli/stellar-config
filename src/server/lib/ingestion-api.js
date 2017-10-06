const R = require('ramda');
const P = require('bluebird');
const request = require('superagent');

const getBody = R.prop('body');

const config = require('../server.json').ingestion;
const root = `http://${config.server}:${config.port}`;

function getSample(sourceUri) {
  return P
    .fromCallback((callback) =>
      request.get(`${root}/sampler/do-sample`)
             .accept('json')
             .query({
               file: sourceUri,
               samples: 25,
             })
             .end(callback)
    )
    .then(getBody);
}

module.exports = {
  getSample,
};
