const {fromJS} = require('immutable');
const actions = require('../actions');

const {
  CONFIG_STATUS_NORMAL,
  CONFIG_STATUS_CHANGED,
} = require('../config-status');

const initialState = fromJS({
  name: '',
  sources: [],
  status: CONFIG_STATUS_NORMAL,
});

function reduce(state = initialState, action) {
  switch (action.type) {
    case actions.INGESTION_PROFILE_LOAD:
      return state
        .set('name', action.name)
        .set('sources', fromJS(action.content.sources))
        .set('status', CONFIG_STATUS_NORMAL);

    case actions.INGESTION_PROFILE_RESET_STATUS:
      return state.set('status', CONFIG_STATUS_NORMAL);

    case actions.INGESTION_PROFILE_RESET:
      return initialState;

    case actions.INGESTION_PROFILE_ADD_SOURCE:
      return state
        .set('sources', state.get('sources').push(action.source))
        .set('status', CONFIG_STATUS_CHANGED);

    default:
      return state;
  }
}

module.exports = reduce;
