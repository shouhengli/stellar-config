const {fromJS} = require('immutable');
const actions = require('../../actions');

const initialState = fromJS({
  newFileVisible: false,
  newFileName: '',
  deleteFileVisible: false,
  deleteFileName: '',
  selectedSource: '',
  newSource: '',
  newSourceVisible: false,
  deleteSourceVisible: false,
  sample: null,
});

function reduceState(state = initialState, action) {
  switch (action.type) {
    case actions.INGESTION_PROFILE_REVEAL_NEW:
      return state.set('newFileVisible', true);

    case actions.INGESTION_PROFILE_HIDE_NEW:
      return state.set('newFileVisible', false);

    case actions.INGESTION_PROFILE_SET_NEW_NAME:
      return state.set('newFileName', action.name);

    case actions.INGESTION_PROFILE_ADD_NEW:
      return state.set('newFileName', '');

    case actions.INGESTION_PROFILE_HIDE_DELETE:
      return state.set('deleteFileVisible', false);

    case actions.INGESTION_PROFILE_REVEAL_DELETE:
      return state.set('deleteFileVisible', true);

    case actions.INGESTION_PROFILE_SET_DELETE_NAME:
      return state.set('deleteFileName', action.name);

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
