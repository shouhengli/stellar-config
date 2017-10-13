const {fromJS} = require('immutable');
const actions = require('../../actions');

const initialState = fromJS({
  newConfigVisible: false,
  newConfigName: '',
  deleteConfigVisible: false,
  deleteConfigName: '',
  selectedSource: '',
  newSource: '',
  newSourceVisible: false,
  deleteSourceVisible: false,
  sample: null,
});

function reduceState(state = initialState, action) {
  switch (action.type) {
    case actions.INGESTION_PROFILE_REVEAL_NEW:
      return state.set('newConfigVisible', true);

    case actions.INGESTION_PROFILE_HIDE_NEW:
      return state.set('newConfigVisible', false);

    case actions.INGESTION_PROFILE_SET_NEW_NAME:
      return state.set('newConfigName', action.name);

    case actions.INGESTION_PROFILE_ADD_NEW:
      return state.set('newConfigName', '');

    case actions.INGESTION_PROFILE_HIDE_DELETE:
      return state.set('deleteConfigVisible', false);

    case actions.INGESTION_PROFILE_REVEAL_DELETE:
      return state.set('deleteConfigVisible', true);

    case actions.INGESTION_PROFILE_SET_DELETE_NAME:
      return state.set('deleteConfigName', action.name);

    case actions.INGESTION_PROFILE_SET_SELECTED_SOURCE:
      return state.set('selectedSource', action.source);

    case actions.INGESTION_PROFILE_SET_NEW_SOURCE:
      return state.set('newSource', action.source);

    case actions.INGESTION_PROFILE_HIDE_NEW_SOURCE:
      return state.set('newSourceVisible', false);

    case actions.INGESTION_PROFILE_REVEAL_NEW_SOURCE:
      return state.set('newSourceVisible', true);

    case actions.INGESTION_PROFILE_ADD_SOURCE:
      return state
        .set('newSource', '')
        .set('newSourceVisible', false);

    case actions.INGESTION_PROFILE_LOAD_SAMPLE:
      return state.set('sample', fromJS(action.sample));

    case actions.INGESTION_PROFILE_HIDE_DELETE_SOURCE:
      return state.set('deleteSourceVisible', false);

    case actions.INGESTION_PROFILE_REVEAL_DELETE_SOURCE:
      return state.set('deleteSourceVisible', true);

    default:
      return state;
  }
}

module.exports = reduceState;
