const R = require('ramda');
const P = require('bluebird');
const request = require('superagent');

const getBody = R.prop('body');

function getConfig(configType, configName) {
  return P.fromCallback(callback =>
    request
      .get(`/config/${configType}/${configName}`)
      .accept('json')
      .end(callback)
  ).then(getBody);
}

function postConfig(configType, configName, configContent) {
  return P.fromCallback(callback =>
    request
      .post(`/config/${configType}/${configName}`)
      .send(configContent)
      .end(callback)
  );
}

function deleteConfig(configType, configName) {
  return P.fromCallback(callback =>
    request.delete(`/config/${configType}/${configName}`).end(callback)
  );
}

function getConfigTypes() {
  return P.fromCallback(callback =>
    request
      .get('/config')
      .accept('json')
      .end(callback)
  ).then(getBody);
}

function getConfigNames(configType) {
  return P.fromCallback(callback =>
    request
      .get(`/config/${configType}`)
      .accept('json')
      .end(callback)
  ).then(getBody);
}

function getIngestionSample(source) {
  return P.fromCallback(callback =>
    request
      .get('/ingestion/sample')
      .accept('json')
      .query({ source })
      .end(callback)
  ).then(getBody);
}

module.exports = {
  getConfig,
  postConfig,
  deleteConfig,
  getConfigTypes,
  getConfigNames,
  getIngestionSample
};
