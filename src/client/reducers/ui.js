import reduceIngestionProfileState from './ui/ingestion-profile';
import reduceGraphSchemaState from './ui/graph-schema';
import reduceGraphSchemaClassesState from './ui/graph-schema-classes';
import reduceGraphSchemaClassLinksState from './ui/graph-schema-class-links';
import reduceSearchState from './ui/search';
import reduceViewState from './ui/view';
import reduceSplitView from './ui/split-view';

const { combineReducers } = require('redux-immutable');

export default combineReducers({
  ingestionProfile: reduceIngestionProfileState,
  graphSchema: reduceGraphSchemaState,
  graphSchemaClasses: reduceGraphSchemaClassesState,
  graphSchemaClassLinks: reduceGraphSchemaClassLinksState,
  search: reduceSearchState,
  view: reduceViewState,
  splitView: reduceSplitView
});
