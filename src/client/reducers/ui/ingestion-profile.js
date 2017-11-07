const {is, fromJS, Map, OrderedMap} = require('immutable');
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
  editingNodeIndex: -1,
  newLinkVisible: false,
  mappingNode: OrderedMap(),
  newLink: {},
  mappingNodeActiveProp: {
    key: null,
    valueActive: false,
  },
  newLinkActiveProp: {
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
      return state
        .set('newNodeVisible', true)
        .set('editingNodeIndex', initialState.get('editingNodeIndex'))
        .set('mappingNode', initialState.get('mappingNode'))
        .set('mappingNodeActiveProp', initialState.get('mappingNodeActiveProp'));

    case actions.INGESTION_PROFILE_TOGGLE_MAPPING_NODE_ACTIVE_PROP_KEY:
      if (action.key === state.getIn(['mappingNodeActiveProp', 'key'])) {
        return state.set('mappingNodeActiveProp', initialState.get('mappingNodeActiveProp'));
      }

      return state.set(
        'mappingNodeActiveProp',
        Map({
          key: action.key,
          valueActive: false,
        })
      );

    case actions.INGESTION_PROFILE_TOGGLE_MAPPING_NODE_ACTIVE_PROP_VALUE:
      if (
        action.key === state.getIn(['mappingNodeActiveProp', 'key'])
        && state.getIn(['mappingNodeActiveProp', 'valueActive'])
      ) {
        return state.set('mappingNodeActiveProp', initialState.get('mappingNodeActiveProp'));
      }

      return state.set(
        'mappingNodeActiveProp',
        Map({
          key: action.key,
          valueActive: true,
        })
      );

    case actions.INGESTION_PROFILE_ADD_MAPPING_NODE_PROP:
      if (!state.hasIn(['mappingNode', ''])) {
        return state.setIn(['mappingNode', ''], Map({source: '', column: ''}));
      }

      return state;

    case actions.INGESTION_PROFILE_DELETE_MAPPING_NODE_PROP:
      return state.deleteIn(['mappingNode', action.key]);

    case actions.INGESTION_PROFILE_SET_MAPPING_NODE_PROP_KEY: {
      const prevValue = state.getIn(['mappingNode', action.prevKey]);
      return state
        .deleteIn(['mappingNode', action.prevKey])
        .setIn(['mappingNode', action.key], prevValue)
        .set('mappingNodeActiveProp', initialState.get('mappingNodeActiveProp'));
    }

    case actions.INGESTION_PROFILE_SET_MAPPING_NODE_PROP_VALUE: {
      state = state.setIn(['mappingNode', action.key], fromJS(action.value));

      if (action.shouldResetActiveProp) {
        return state.set('mappingNodeActiveProp', initialState.get('mappingNodeActiveProp'));
      }

      return state;
    }

    case actions.INGESTION_PROFILE_RESET_MAPPING_NODE:
    case actions.INGESTION_PROFILE_ADD_MAPPING_NODE:
    case actions.INGESTION_PROFILE_UPDATE_MAPPING_NODE:
    case actions.INGESTION_PROFILE_DELETE_MAPPING_NODE:
      return state
        .set('newNodeVisible', initialState.get('newNodeVisible'))
        .set('editingNodeIndex', initialState.get('editingNodeIndex'))
        .set('mappingNode', initialState.get('mappingNode'))
        .set('mappingNodeActiveProp', initialState.get('mappingNodeActiveProp'));

    case actions.INGESTION_PROFILE_EDIT_MAPPING_NODE:
      return state
        .set('editingNodeIndex', action.index)
        .set('mappingNode', action.node)
        .set('newNodeVisible', initialState.get('newNodeVisible'));

    case actions.INGESTION_PROFILE_REVEAL_NEW_LINK:
      return state.set('newLinkVisible', true);

    case actions.INGESTION_PROFILE_TOGGLE_NEW_LINK_ACTIVE_PROP_KEY:
      if (action.key === state.getIn(['newLinkActiveProp', 'key'])) {
        return state.set('newLinkActiveProp', initialState.get('newLinkActiveProp'));
      }

      return state.set(
        'newLinkActiveProp',
        Map({
          key: action.key,
          valueActive: false,
        })
      );

    case actions.INGESTION_PROFILE_TOGGLE_NEW_LINK_ACTIVE_PROP_VALUE:
      if (
        is(state.getIn(['newLinkActiveProp', 'key']), action.key)
        && state.getIn(['newLinkActiveProp', 'valueActive'])
      ) {
        return state.set('newLinkActiveProp', initialState.get('newLinkActiveProp'));
      }

      return state.set(
        'newLinkActiveProp',
        Map({
          key: action.key,
          valueActive: true,
        })
      );

    case actions.INGESTION_PROFILE_SET_NEW_LINK_PROP_VALUE:
      state = state.setIn(['newLink', action.key], fromJS(action.value));

      if (action.shouldResetActiveLink) {
        return state.set('newLinkActiveProp', initialState.get('newLinkActiveProp'));
      }

      return state;

    case actions.INGESTION_PROFILE_RESET_NEW_LINK:
    case actions.INGESTION_PROFILE_ADD_NEW_LINK:
      return state
        .set('newLinkVisible', initialState.get('newLinkVisible'))
        .set('newLink', initialState.get('newLink'))
        .set('newLinkActiveProp', initialState.get('newLinkActiveProp'));

    case actions.INGESTION_PROFILE_DELETE_NEW_LINK_PROP:
      return state.deleteIn(['newLink', action.key]);

    case actions.INGESTION_PROFILE_ADD_NEW_LINK_PROP:
      if (!state.hasIn(['newLink', ''])) {
        return state.setIn(['newLink', ''], Map({source: '', column: ''}));
      }

      return state;

    case actions.INGESTION_PROFILE_SET_NEW_LINK_PROP_KEY: {
      const prevValue = state.getIn(['newLink', action.prevKey]);
      return state
        .deleteIn(['newLink', action.prevKey])
        .setIn(['newLink', action.key], prevValue)
        .set('newLinkActiveProp', initialState.get('newLinkActiveProp'));
    }

    default:
      return state;
  }
}

module.exports = reduceState;
