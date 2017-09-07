const {createStore, applyMiddleware} = require('redux');
const {combineReducers} = require('redux-immutable');
const thunk = require('redux-thunk').default;

module.exports = createStore(
  combineReducers({
    search: require('./reducers/search'),
    edit: require('./reducers/edit'),
    ui: require('./reducers/ui'),
    graphSchema: require('./reducers/graph-schema'),
  }),
  applyMiddleware(thunk)
);
