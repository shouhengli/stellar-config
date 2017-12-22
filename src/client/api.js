import R from 'ramda';
import P from 'bluebird';
import request from 'superagent';

const getBody = R.prop('body');

export function getConfig(configType, configName) {
  return P.fromCallback(callback =>
    request
      .get(`/config/${configType}/${configName}`)
      .accept('json')
      .end(callback)
  ).then(getBody);
}

export function postConfig(configType, configName, configContent) {
  return P.fromCallback(callback =>
    request
      .post(`/config/${configType}/${configName}`)
      .send(configContent)
      .end(callback)
  );
}

export function postGraphSchema(configType, configName, graphSchemaContent) {
  return P.fromCallback(callback =>
    request
      .post(`/config/${configType}/${configName}/graphSchema`)
      .send(graphSchemaContent)
      .end(callback)
  ).then(getBody);
}

export function deleteConfig(configType, configName) {
  return P.fromCallback(callback =>
    request.delete(`/config/${configType}/${configName}`).end(callback)
  );
}

export function getConfigTypes() {
  return P.fromCallback(callback =>
    request
      .get('/config')
      .accept('json')
      .end(callback)
  ).then(getBody);
}

export function getConfigNames(configType) {
  return P.fromCallback(callback =>
    request
      .get(`/config/${configType}`)
      .accept('json')
      .end(callback)
  ).then(getBody);
}

export function getIngestionSample(source) {
  return P.fromCallback(callback =>
    request
      .get('/ingestion/sample')
      .accept('json')
      .query({ source })
      .end(callback)
  ).then(getBody);
}
