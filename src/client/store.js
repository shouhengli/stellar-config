import { createStore, applyMiddleware, compose } from 'redux';
import { combineReducers } from 'redux-immutable';
import thunk from 'redux-thunk';
import uiReducer from './reducers/ui';
import ingestionProfileReducer from './reducers/ingestion-profile';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default createStore(
  combineReducers({
    ui: uiReducer,
    ingestionProfile: ingestionProfileReducer
  }),
  composeEnhancers(applyMiddleware(thunk))
);
