import reduceIngestionProfileState from './ui/ingestion-profile';
import reduceSearchState from './ui/search';
import reduceViewState from './ui/view';
import reduceSplitView from './ui/split-view';
import { combineReducers } from 'redux-immutable';

export default combineReducers({
  ingestionProfile: reduceIngestionProfileState,
  search: reduceSearchState,
  view: reduceViewState,
  splitView: reduceSplitView
});
