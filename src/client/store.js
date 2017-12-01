import { createStore, applyMiddleware } from 'redux';
import { combineReducers } from 'redux-immutable';
import thunk from 'redux-thunk';
import uiReducer from './reducers/ui';
import ingestionProfileReducer from './reducers/ingestion-profile';

export default createStore(
  combineReducers({
    ui: uiReducer,
    ingestionProfile: ingestionProfileReducer
  }),
  applyMiddleware(thunk)
);
