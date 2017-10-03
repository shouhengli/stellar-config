const R = require('ramda');
const P = require('bluebird');
const request = require('superagent');
const actions = require('../actions');
const {GRAPH_SCHEMA_CONFIG_TYPE} = require('../graph-schema');

function setSelectedSource(selectedSource) {
  return {
    type: actions.SET_INGESTION_PROFILE_SELECTED_SOURCE,
    selectedSource,
  };
}

function setNewSource(newSource) {
  return {
    type: actions.SET_INGESTION_PROFILE_NEW_SOURCE,
    newSource,
  };
}

function loadGraphSchemas(graphSchemas) {
  return {
    type: actions.LOAD_INGESTION_PROFILE_GRAPH_SCHEMAS,
    graphSchemas,
  };
}

function loadGraphSchemasAsync() {
  return (dispatch) => {
    const promise = new P((resolve, reject) =>
      request
        .get(`/config/${GRAPH_SCHEMA_CONFIG_TYPE}`)
        .accept('json')
        .end((error, response) => {
          if (R.isNil(error)) {
            resolve(response.body);
          } else {
            reject(error);
          }
        })
    );

    promise.then(R.compose(dispatch, loadGraphSchemas));

    return promise;
  };
}

module.exports = {
  setSelectedSource,
  setNewSource,
  loadGraphSchemasAsync,
};
