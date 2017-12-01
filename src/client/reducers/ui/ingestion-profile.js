import { is, fromJS, Map, OrderedMap } from 'immutable';
import actions from '../../actions';
import { TAB_SOURCE } from '../../ingestion-profile';

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
  editingLinkIndex: -1,
  mappingNode: OrderedMap(),
  mappingLink: OrderedMap(),
  mappingNodeActiveProp: {
    key: null,
    valueActive: false
  },
  mappingLinkActiveProp: {
    key: null,
    valueActive: false
  }
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
      return state.set('newSource', '').set('newSourceVisible', false);

    case actions.INGESTION_PROFILE_LOAD_SAMPLES:
      return state.set('samples', fromJS(action.samples));

    case actions.INGESTION_PROFILE_ADD_SAMPLE:
      return state.setIn(['samples', action.source], fromJS(action.sample));

    case actions.INGESTION_PROFILE_DELETE_SOURCE:
      return state.set('selectedSource', '').set('deleteSourceVisible', false);

    case actions.INGESTION_PROFILE_HIDE_DELETE_SOURCE:
      return state.set('deleteSourceVisible', false);

    case actions.INGESTION_PROFILE_REVEAL_DELETE_SOURCE:
      return state.set('deleteSourceVisible', true);

    case actions.INGESTION_PROFILE_RESET:
      return state.set('deleteVisible', false).set('deleteName', '');

    case actions.INGESTION_PROFILE_SET_ACTIVE_TAB:
      return state.set('activeTab', action.tab);

    case actions.INGESTION_PROFILE_REVEAL_NEW_NODE:
      return state
        .set('newNodeVisible', true)
        .set('editingNodeIndex', initialState.get('editingNodeIndex'))
        .set('mappingNode', initialState.get('mappingNode'))
        .set(
          'mappingNodeActiveProp',
          initialState.get('mappingNodeActiveProp')
        );

    case actions.INGESTION_PROFILE_TOGGLE_MAPPING_NODE_ACTIVE_PROP_KEY:
      if (action.key === state.getIn(['mappingNodeActiveProp', 'key'])) {
        return state.set(
          'mappingNodeActiveProp',
          initialState.get('mappingNodeActiveProp')
        );
      }

      return state.set(
        'mappingNodeActiveProp',
        Map({
          key: action.key,
          valueActive: false
        })
      );

    case actions.INGESTION_PROFILE_TOGGLE_MAPPING_NODE_ACTIVE_PROP_VALUE:
      if (
        action.key === state.getIn(['mappingNodeActiveProp', 'key']) &&
        state.getIn(['mappingNodeActiveProp', 'valueActive'])
      ) {
        return state.set(
          'mappingNodeActiveProp',
          initialState.get('mappingNodeActiveProp')
        );
      }

      return state.set(
        'mappingNodeActiveProp',
        Map({
          key: action.key,
          valueActive: true
        })
      );

    case actions.INGESTION_PROFILE_ADD_MAPPING_NODE_PROP:
      if (!state.hasIn(['mappingNode', ''])) {
        return state.setIn(
          ['mappingNode', ''],
          Map({ source: '', column: '' })
        );
      }

      return state;

    case actions.INGESTION_PROFILE_DELETE_MAPPING_NODE_PROP:
      return state.deleteIn(['mappingNode', action.key]);

    case actions.INGESTION_PROFILE_SET_MAPPING_NODE_PROP_KEY: {
      if (!state.hasIn(['mappingNode', action.prevKey])) {
        return state;
      }
      const prevValue = state.getIn(['mappingNode', action.prevKey]);
      return state
        .deleteIn(['mappingNode', action.prevKey])
        .setIn(['mappingNode', action.key], prevValue)
        .set(
          'mappingNodeActiveProp',
          initialState.get('mappingNodeActiveProp')
        );
    }

    case actions.INGESTION_PROFILE_SET_MAPPING_NODE_PROP_VALUE: {
      state = state.setIn(['mappingNode', action.key], fromJS(action.value));
      if (action.shouldResetActiveProp) {
        return state.set(
          'mappingNodeActiveProp',
          initialState.get('mappingNodeActiveProp')
        );
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
        .set(
          'mappingNodeActiveProp',
          initialState.get('mappingNodeActiveProp')
        );

    case actions.INGESTION_PROFILE_EDIT_MAPPING_NODE:
      return state
        .set('editingNodeIndex', action.index)
        .set('mappingNode', action.node)
        .set('newNodeVisible', initialState.get('newNodeVisible'));

    case actions.INGESTION_PROFILE_REVEAL_NEW_LINK:
      return state
        .set('newLinkVisible', true)
        .set('editingLinkIndex', initialState.get('editingLinkIndex'))
        .set('mappingLink', initialState.get('mappingLink'))
        .set(
          'mappingLinkActiveProp',
          initialState.get('mappingLinkActiveProp')
        );

    case actions.INGESTION_PROFILE_TOGGLE_MAPPING_LINK_ACTIVE_PROP_KEY:
      if (action.key === state.getIn(['mappingLinkActiveProp', 'key'])) {
        return state.set(
          'mappingLinkActiveProp',
          initialState.get('mappingLinkActiveProp')
        );
      }

      return state.set(
        'mappingLinkActiveProp',
        Map({
          key: action.key,
          valueActive: false
        })
      );

    case actions.INGESTION_PROFILE_TOGGLE_MAPPING_LINK_ACTIVE_PROP_VALUE:
      if (
        is(state.getIn(['mappingLinkActiveProp', 'key']), action.key) &&
        state.getIn(['mappingLinkActiveProp', 'valueActive'])
      ) {
        return state.set(
          'mappingLinkActiveProp',
          initialState.get('mappingLinkActiveProp')
        );
      }

      return state.set(
        'mappingLinkActiveProp',
        Map({
          key: action.key,
          valueActive: true
        })
      );

    case actions.INGESTION_PROFILE_SET_MAPPING_LINK_PROP_VALUE:
      state = state.setIn(['mappingLink', action.key], fromJS(action.value));

      if (action.shouldResetActiveLink) {
        return state.set(
          'mappingLinkActiveProp',
          initialState.get('mappingLinkActiveProp')
        );
      }

      return state;

    case actions.INGESTION_PROFILE_RESET_MAPPING_LINK:
    case actions.INGESTION_PROFILE_ADD_MAPPING_LINK:
    case actions.INGESTION_PROFILE_UPDATE_MAPPING_LINK:
    case actions.INGESTION_PROFILE_DELETE_MAPPING_LINK:
      return state
        .set('newLinkVisible', initialState.get('newLinkVisible'))
        .set('editingLinkIndex', initialState.get('editingLinkIndex'))
        .set('mappingLink', initialState.get('mappingLink'))
        .set(
          'mappingLinkActiveProp',
          initialState.get('mappingLinkActiveProp')
        );

    case actions.INGESTION_PROFILE_DELETE_MAPPING_LINK_PROP:
      return state.deleteIn(['mappingLink', action.key]);

    case actions.INGESTION_PROFILE_ADD_MAPPING_LINK_PROP:
      if (!state.hasIn(['mappingLink', ''])) {
        return state.setIn(
          ['mappingLink', ''],
          Map({ source: '', column: '' })
        );
      }

      return state;

    case actions.INGESTION_PROFILE_SET_MAPPING_LINK_PROP_KEY: {
      if (!state.hasIn(['mappingLink', action.prevKey])) {
        return state;
      }
      const prevValue = state.getIn(['mappingLink', action.prevKey]);

      return state
        .deleteIn(['mappingLink', action.prevKey])
        .setIn(['mappingLink', action.key], prevValue)
        .set(
          'mappingLinkActiveProp',
          initialState.get('mappingLinkActiveProp')
        );
    }

    case actions.INGESTION_PROFILE_EDIT_MAPPING_LINK:
      return state
        .set('editingLinkIndex', action.index)
        .set('mappingLink', action.link)
        .set('newLinkVisible', initialState.get('newLinkVisible'));

    default:
      return state;
  }
}

module.exports = reduceState;
