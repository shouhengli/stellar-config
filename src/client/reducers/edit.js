const {fromJS} = require('immutable');
const actions = require('../actions');
const {CONFIG_STATUS_NORMAL, CONFIG_STATUS_CHANGED} = require('../config-status');

const initialEditState = fromJS({
  type: null,
  name: null,
  content: '',
  status: CONFIG_STATUS_NORMAL,
});

function reduceEditState(state = initialEditState, action) {
  switch (action.type) {
    case actions.LOAD_EDIT_CONFIG:
      return state
        .set('type', action.configType)
        .set('name', action.configName)
        .set('content', action.configContent)
        .set('status', CONFIG_STATUS_NORMAL);

    case actions.SET_EDIT_CONFIG_CONTENT:
      return state
        .set('content', action.configContent)
        .set('status', CONFIG_STATUS_CHANGED);

    case actions.SET_EDIT_CONFIG_STATUS:
      return state.set('status', action.configStatus);

    case actions.RESET_EDIT_CONFIG:
      return state
        .set('type', null)
        .set('name', null)
        .set('content', '')
        .set('status', CONFIG_STATUS_NORMAL);

    default:
      return state;
  }
}

module.exports = reduceEditState;
