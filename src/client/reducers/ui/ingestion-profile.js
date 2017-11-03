const {fromJS, Map} = require('immutable');
const actions = require('../../actions');
const {TAB_SOURCE} = require('../../ingestion-profile');

const initialState = fromJS({
  activeTab: TAB_SOURCE,
  newVisible: false,
  newName: '',
  deleteVisible: false,
  deleteName: '',
  selectedSource: '',
  newSource: '',
  newSourceVisible: false,
  deleteSourceVisible: false,
  samples: {},
  newNodeVisible: false,
  newLinkVisible: false,
  newNode: {},
  newNodeActiveProp: {
    key: null,
    valueActive: false,
  },
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

    case actions.INGESTION_PROFILE_LOAD_SAMPLES:
      return state.set('samples', fromJS(action.samples));

    case actions.INGESTION_PROFILE_ADD_SAMPLE:
      return state.setIn(['samples', action.source], fromJS(action.sample));

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

    case actions.INGESTION_PROFILE_REVEAL_NEW_NODE:
      return state.set('newNodeVisible', true);

    case actions.INGESTION_PROFILE_REVEAL_NEW_LINK:
      return state.set('newLinkVisible', true);

    case actions.INGESTION_PROFILE_TOGGLE_NEW_NODE_ACTIVE_PROP_KEY:
      if (action.key === state.getIn(['newNodeActiveProp', 'key'])) {
        return state.set('newNodeActiveProp', initialState.get('newNodeActiveProp'));
      }

      return state.set(
        'newNodeActiveProp',
        Map({
          key: action.key,
          valueActive: false,
        })
      );

    case actions.INGESTION_PROFILE_TOGGLE_NEW_NODE_ACTIVE_PROP_VALUE:
      if (
        action.key === state.getIn(['newNodeActiveProp', 'key'])
        && state.getIn(['newNodeActiveProp', 'valueActive'])
      ) {
        return state.set('newNodeActiveProp', initialState.get('newNodeActiveProp'));
      }

      return state.set(
        'newNodeActiveProp',
        Map({
          key: action.key,
          valueActive: true,
        })
      );

    case actions.INGESTION_PROFILE_ADD_NEW_NODE_PROP:
      if (!state.hasIn(['newNode', ''])) {
        return state.setIn(['newNode', ''], Map({source: '', column: ''}));
      }

      return state;

    case actions.INGESTION_PROFILE_DELETE_NEW_NODE_PROP:
      return state.deleteIn(['newNode', action.key]);

    case actions.INGESTION_PROFILE_SET_NEW_NODE_PROP_KEY: {
      const prevValue = state.getIn(['newNode', action.prevKey]);
      return state
        .deleteIn(['newNode', action.prevKey])
        .setIn(['newNode', action.key], prevValue)
        .set('newNodeActiveProp', initialState.get('newNodeActiveProp'));
    }

    case actions.INGESTION_PROFILE_SET_NEW_NODE_PROP_VALUE: {
      const prevValue = state.getIn(['newNode', action.key], Map());
      state = state.setIn(['newNode', action.key], fromJS(action.value));

      if (
        prevValue instanceof Map
        && prevValue.get('source') !== state.getIn(['newNode', action.key, 'source'])
      ) {
        return state;
      }

      return state.set('newNodeActiveProp', initialState.get('newNodeActiveProp'));
    }

    case actions.INGESTION_PROFILE_RESET_NEW_NODE:
    case actions.INGESTION_PROFILE_ADD_NEW_NODE:
      return state
        .set('newNodeVisible', initialState.get('newNodeVisible'))
        .set('newNode', initialState.get('newNode'))
        .set('newNodeActiveProp', initialState.get('newNodeActiveProp'));

    default:
      return state;
  }
}

module.exports = reduceState;
