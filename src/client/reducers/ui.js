const {fromJS} = require('immutable');
const actions = require('../actions');

const initialUiState = fromJS({
  newConfigVisible: false,
  newConfigType: '',
  newConfigName: '',
  configDeleteVisible: false,
  configDeleteName: '',
});

function reduceUiState(state = initialUiState, action) {
  switch (action.type) {
    case actions.REVEAL_NEW_CONFIG:
      return state.set('newConfigVisible', true);

    case actions.HIDE_NEW_CONFIG:
      return state.set('newConfigVisible', false);

    case actions.SET_NEW_CONFIG_TYPE:
      return state.set('newConfigType', action.configType);

    case actions.SET_NEW_CONFIG_NAME:
      return state.set('newConfigName', action.configName);

    case actions.ADD_NEW_CONFIG:
      return state
        .set('newConfigType', '')
        .set('newConfigName', '');

    case actions.HIDE_CONFIG_DELETE:
      return state.set('configDeleteVisible', false);

    case actions.REVEAL_CONFIG_DELETE:
      return state.set('configDeleteVisible', true);

    case actions.SET_CONFIG_DELETE_NAME:
      return state.set('configDeleteName', action.configName);

    default:
      return state;
  }
}

module.exports = reduceUiState;
