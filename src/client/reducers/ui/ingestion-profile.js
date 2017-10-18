const {fromJS} = require('immutable');
const actions = require('../../actions');
const {TAB_SOURCE} = require('../../ingestion-profile');

const initialState = fromJS({
  newVisible: false,
  newName: '',
  deleteVisible: false,
  deleteName: '',
  selectedSource: '',
  newSource: '',
  newSourceVisible: false,
  deleteSourceVisible: false,
  sample: null,
  activeTab: TAB_SOURCE,
});

function reduceState(state = initialState, action) {
  switch (action.type) {
    case actions.INGESTION_PROFILE_LOAD:
      return initialState;

    case actions.INGESTION_PROFILE_REVEAL_NEW:
      return state.set('newVisible', true);

    case actions.INGESTION_PROFILE_HIDE_NEW:
      return state.set('newVisible', false);

    case actions.INGESTION_PROFILE_SET_NEW_NAME:
      return state.set('newName', action.name);

    case actions.INGESTION_PROFILE_HIDE_DELETE:
      return state.set('deleteVisible', false);

    case actions.INGESTION_PROFILE_REVEAL_DELETE:
      return state.set('deleteVisible', true);

    case actions.INGESTION_PROFILE_SET_DELETE_NAME:
      return state.set('deleteName', action.name);

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

    case actions.INGESTION_PROFILE_DELETE_SOURCE:
      return state
        .set('selectedSource', '')
        .set('deleteSourceVisible', false);

    case actions.INGESTION_PROFILE_HIDE_DELETE_SOURCE:
      return state.set('deleteSourceVisible', false);

    case actions.INGESTION_PROFILE_REVEAL_DELETE_SOURCE:
      return state.set('deleteSourceVisible', true);

    case actions.INGESTION_PROFILE_RESET:
      return state
        .set('deleteVisible', false)
        .set('deleteName', '');

    case actions.INGESTION_PROFILE_SET_ACTIVE_TAB:
      return state.set('activeTab', action.tab);

    default:
      return state;
  }
}

module.exports = reduceState;
