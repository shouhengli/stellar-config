const reduceIngestionProfileState = require('./ui/ingestion-profile');
const reduceGraphSchemaState = require('./ui/graph-schema');
const reduceSearchState = require('./ui/search');

const {combineReducers} = require('redux-immutable');

module.exports = combineReducers({
  ingestionProfile: reduceIngestionProfileState,
  graphSchema: reduceGraphSchemaState,
  search: reduceSearchState,
});
