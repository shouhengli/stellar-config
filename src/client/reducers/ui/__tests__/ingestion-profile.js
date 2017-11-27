import { fromJS, OrderedMap, Map } from 'immutable';
import reduceState from '../ingestion-profile';
import actions from '../../../actions';
import { TAB_SOURCE } from '../../../ingestion-profile';

describe('reducer ui/ingestion-profile', () => {
  let initialState;

  beforeEach(() => {
    initialState = fromJS({
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
  });

  describe('when INGESTION_PROFILE_LOAD', () => {
    it('reset to initial state', () => {
      const action = { type: actions.INGESTION_PROFILE_LOAD };
      const state = initialState.set('something', 'bad');
      const next = reduceState(state, action);
      expect(next).toEqual(initialState);
    });
  });
  describe('when INGESTION_PROFILE_REVEAL_NEW', () => {
    it('reveals new file UI', () => {
      const state = initialState.set('newVisible', false);
      const action = { type: actions.INGESTION_PROFILE_REVEAL_NEW };
      const next = reduceState(state, action);

      const expected = state.set('newVisible', true);
      expect(next).toEqual(expected);
    });
  });

  describe('when INGESTION_PROFILE_HIDE_NEW', () => {
    it('hides new file UI', () => {
      const state = initialState.set('newVisible', true);
      const action = { type: actions.INGESTION_PROFILE_HIDE_NEW };
      const next = reduceState(state, action);

      const expected = state.set('newVisible', false);
      expect(next).toEqual(expected);
    });
  });

  describe('when INGESTION_PROFILE_SET_NEW_NAME', () => {
    it('updates name of new file', () => {
      const action = {
        type: actions.INGESTION_PROFILE_SET_NEW_NAME,
        name: 'people'
      };
      const next = reduceState(initialState, action);
      const expected = initialState.set('newName', 'people');

      expect(next).toEqual(expected);
    });
  });

  describe('when INGESTION_PROFILE_HIDE_DELETE', () => {
    it('hides delete file UI', () => {
      const state = initialState.set('deleteVisible', true);
      const action = { type: actions.INGESTION_PROFILE_HIDE_DELETE };
      const next = reduceState(state, action);

      const expected = state.set('deleteVisible', false);
      expect(next).toEqual(expected);
    });
  });

  describe('when INGESTION_PROFILE_REVEAL_DELETE', () => {
    it('reveals delete file UI', () => {
      const state = initialState.set('deleteVisible', false);
      const action = { type: actions.INGESTION_PROFILE_REVEAL_DELETE };
      const next = reduceState(state, action);

      const expected = state.set('deleteVisible', true);
      expect(next).toEqual(expected);
    });
  });

  describe('when INGESTION_PROFILE_SET_DELETE_NAME', () => {
    it('updates name of file to be deleted', () => {
      const action = {
        type: actions.INGESTION_PROFILE_SET_DELETE_NAME,
        name: 'people'
      };
      const next = reduceState(initialState, action);
      const expected = initialState.set('deleteName', 'people');

      expect(next).toEqual(expected);
    });
  });

  describe('when INGESTION_PROFILE_SET_SELECTED_SOURCE', () => {
    it('selects source with specified URI', () => {
      const action = {
        type: actions.INGESTION_PROFILE_SET_SELECTED_SOURCE,
        source: 'http://source.me/people.csv'
      };
      const next = reduceState(initialState, action);
      const expected = initialState.set('selectedSource', action.source);

      expect(next).toEqual(expected);
    });
  });

  describe('when INGESTION_PROFILE_SET_NEW_SOURCE', () => {
    it('sets new source URI', () => {
      const action = {
        type: actions.INGESTION_PROFILE_SET_NEW_SOURCE,
        source: 'http://source.me/people.csv'
      };
      const next = reduceState(initialState, action);
      const expected = initialState.set('newSource', action.source);

      expect(next).toEqual(expected);
    });
  });

  describe('when INGESTION_PROFILE_HIDE_NEW_SOURCE', () => {
    it('hides new source', () => {
      const action = { type: actions.INGESTION_PROFILE_HIDE_NEW_SOURCE };
      const next = reduceState(
        initialState.set('newSourceVisible', true),
        action
      );
      const expected = initialState.set('newSourceVisible', false);

      expect(next).toEqual(expected);
    });
  });

  describe('when INGESTION_PROFILE_REVEAL_NEW_SOURCE', () => {
    it('reveals new source', () => {
      const action = { type: actions.INGESTION_PROFILE_REVEAL_NEW_SOURCE };
      const next = reduceState(initialState, action);
      const expected = initialState.set('newSourceVisible', true);

      expect(next).toEqual(expected);
    });
  });

  describe('when INGESTION_PROFILE_ADD_SOURCE', () => {
    it('resets new source URI and hides new source', () => {
      const action = { type: actions.INGESTION_PROFILE_ADD_SOURCE };
      const next = reduceState(
        initialState
          .set('newSource', 'http://source.me/vehicles.csv')
          .set('newSourceVisible', true),
        action
      );

      expect(next).toEqual(initialState);
    });
  });

  describe('when INGESTION_PROFILE_LOAD_SAMPLE', () => {
    it('loads sample', () => {
      const action = {
        type: actions.INGESTION_PROFILE_LOAD_SAMPLES,
        samples: {
          headers: ['A', 'B'],
          rows: [[0, 1], [5, 6]]
        }
      };
      const next = reduceState(initialState, action);
      const expected = initialState.set('samples', fromJS(action.samples));

      expect(next).toEqual(expected);
    });
  });

  describe('when INGESTION_PROFILE_ADD_SAMPLE', () => {
    it('adds new sample source', () => {
      const action = {
        type: actions.INGESTION_PROFILE_ADD_SAMPLE,
        source: 'abc.csv',
        sample: jest.fn()
      };
      const next = reduceState(initialState, action);

      expect(next.getIn(['samples', 'abc.csv'])).toEqual(action.sample);
    });
  });

  describe('when INGESTION_PROFILE_DELETE_SOURCE', () => {
    it('resets selected source and hides delete source', () => {
      const action = { type: actions.INGESTION_PROFILE_DELETE_SOURCE };
      const next = reduceState(
        initialState
          .set('selectedSource', 'http://source.me/vehicles.csv')
          .set('deleteSourceVisible', true),
        action
      );

      expect(next).toEqual(initialState);
    });
  });

  describe('when INGESTION_PROFILE_HIDE_DELETE_SOURCE', () => {
    it('hides delete source', () => {
      const action = { type: actions.INGESTION_PROFILE_HIDE_DELETE_SOURCE };
      const next = reduceState(
        initialState.set('deleteSourceVisible', true),
        action
      );

      expect(next).toEqual(initialState);
    });
  });

  describe('when INGESTION_PROFILE_REVEAL_DELETE_SOURCE', () => {
    it('reveals delete source', () => {
      const action = { type: actions.INGESTION_PROFILE_REVEAL_DELETE_SOURCE };
      const next = reduceState(
        initialState.set('deleteSourceVisible', false),
        action
      );
      const expected = initialState.set('deleteSourceVisible', true);

      expect(next).toEqual(expected);
    });
  });

  describe('when INGESTION_PROFILE_RESET', () => {
    it('resets delete visible and delete name', () => {
      const action = { type: actions.INGESTION_PROFILE_RESET };
      const next = reduceState(
        initialState.set('deleteVisible', true).set('deleteName', 'acb'),
        action
      );
      expect(next).toEqual(initialState);
    });
  });

  describe('when INGESTION_PROFILE_SET_ACTIVE_TAB', () => {
    it('sets active tab', () => {
      const action = {
        type: actions.INGESTION_PROFILE_SET_ACTIVE_TAB,
        tab: 'new tab'
      };
      const next = reduceState(initialState, action);
      expect(next).toEqual(initialState.set('activeTab', action.tab));
    });
  });

  describe('when INGESTION_PROFILE_REVEAL_NEW_NODE', () => {
    let next;
    beforeEach(() => {
      const action = {
        type: actions.INGESTION_PROFILE_REVEAL_NEW_NODE
      };
      next = reduceState(initialState, action);
    });
    it('sets new node visible to true', () => {
      expect(next.get('newNodeVisible')).toBe(true);
    });

    it('resets node editing and mapping indicators', () => {
      const expected = initialState.set('newNodeVisible', true);
      expect(next).toEqual(expected);
    });
  });

  describe('when INGESTION_PROFILE_TOGGLE_MAPPING_NODE_ACTIVE_PROP_KEY', () => {
    let next, action;
    beforeEach(() => {
      action = {
        type: actions.INGESTION_PROFILE_TOGGLE_MAPPING_NODE_ACTIVE_PROP_KEY,
        key: 'something'
      };
    });
    it('resets mapping node active prop to initial state if key exists', () => {
      next = reduceState(
        initialState.set('mappingNodeActiveProp', Map({ key: 'something' })),
        action
      );
      expect(next.get('mappingNodeActiveProp')).toEqual(
        initialState.get('mappingNodeActiveProp')
      );
    });

    it('sets new mapping node active prop if given key does not exist', () => {
      next = reduceState(
        initialState.set('mappingNodeActiveProp', Map({ key: 'otherthing' })),
        action
      );
      expect(next.get('mappingNodeActiveProp')).toEqual(
        Map({ key: action.key, valueActive: false })
      );
    });
  });

  describe('when INGESTION_PROFILE_TOGGLE_MAPPING_NODE_ACTIVE_PROP_VALUE', () => {
    let next, action;
    beforeEach(() => {
      action = {
        type: actions.INGESTION_PROFILE_TOGGLE_MAPPING_NODE_ACTIVE_PROP_VALUE,
        key: 'something'
      };
    });
    it('resets mapping node active prop to initial state if the provided key exists and value is truthy', () => {
      next = reduceState(
        initialState.set(
          'mappingNodeActiveProp',
          Map({ key: 'something', valueActive: true })
        ),
        action
      );
      expect(next.get('mappingNodeActiveProp')).toEqual(
        initialState.get('mappingNodeActiveProp')
      );
    });

    it('sets new mapping node active prop key if the given key exists but value is falthy', () => {
      next = reduceState(
        initialState.set(
          'mappingNodeActiveProp',
          Map({ key: 'something', valueActive: null })
        ),
        action
      );
      expect(next.get('mappingNodeActiveProp')).toEqual(
        Map({ key: action.key, valueActive: true })
      );
    });

    it('sets new mapping node active prop key if the given key does not exist', () => {
      next = reduceState(
        initialState.set('mappingNodeActiveProp', Map({ key: 'otherthing' })),
        action
      );
      expect(next.get('mappingNodeActiveProp')).toEqual(
        Map({ key: action.key, valueActive: true })
      );
    });
  });

  describe('when INGESTION_PROFILE_ADD_MAPPING_NODE_PROP', () => {
    let next, action;
    beforeEach(() => {
      action = {
        type: actions.INGESTION_PROFILE_ADD_MAPPING_NODE_PROP
      };
    });
    it('adds a new empty mapping node to state', () => {
      next = reduceState(initialState, action);
      expect(next).toEqual(
        initialState.setIn(['mappingNode', ''], Map({ source: '', column: '' }))
      );
    });

    it('does nothing when an empty mapping node already exists', () => {
      const state = initialState.setIn(['mappingNode', ''], jest.fn());
      next = reduceState(state, action);
      expect(next).toEqual(state);
    });
  });

  describe('when INGESTION_PROFILE_DELETE_MAPPING_NODE_PROP', () => {
    let next, action;
    beforeEach(() => {
      action = {
        type: actions.INGESTION_PROFILE_DELETE_MAPPING_NODE_PROP,
        key: 'somekey'
      };
    });

    it('deletes the matching mapping', () => {
      const state = initialState.setIn(
          ['mappingNode', 'somekey'],
          Map({ source: 'something', column: 'column' })
        ),
        next = reduceState(state, action);
      expect(next).toEqual(initialState);
    });

    it('does nothing if no matching key found', () => {
      const state = initialState.setIn(
          ['mappingNode', 'otherkey'],
          Map({ source: 'something', column: 'column' })
        ),
        next = reduceState(state, action);
      expect(next).toEqual(state);
    });
  });

  describe('when INGESTION_PROFILE_SET_MAPPING_NODE_PROP_KEY', () => {
    let next, state, action;
    beforeEach(() => {
      action = {
        type: actions.INGESTION_PROFILE_SET_MAPPING_NODE_PROP_KEY,
        prevKey: 'somekey',
        key: 'otherkey'
      };
      state = initialState
        .setIn(
          ['mappingNode', 'somekey'],
          Map({ source: 'something', column: 'column' })
        )
        .set('mappingNodeActiveProp', jest.fn());
    });

    it('renames the matching mapping node key', () => {
      next = reduceState(state, action);
      expect(next.get('mappingNode')).toEqual(
        OrderedMap({ otherkey: Map({ source: 'something', column: 'column' }) })
      );
    });

    it('resets mapping node active prop to initial state', () => {
      next = reduceState(state, action);
      expect(next.get('mappingNodeActiveProp')).toEqual(
        initialState.get('mappingNodeActiveProp')
      );
    });

    it('does nothing if no matching key found', () => {
      state = initialState
        .setIn(
          ['mappingNode', 'unknownkey'],
          Map({ source: 'something', column: 'column' })
        )
        .set('mappingNodeActiveProp', jest.fn());
      next = reduceState(state, action);
      expect(next).toEqual(state);
    });
  });

  describe('when INGESTION_PROFILE_SET_MAPPING_NODE_PROP_VALUE', () => {
    let next, state, action;
    beforeEach(() => {
      action = {
        type: actions.INGESTION_PROFILE_SET_MAPPING_NODE_PROP_VALUE,
        key: 'somekey',
        value: jest.fn()
      };
      state = initialState
        .setIn(
          ['mappingNode', 'somekey'],
          Map({ source: 'something', column: 'column' })
        )
        .set('mappingNodeActiveProp', jest.fn());
    });

    it('updates the matching mapping node value', () => {
      next = reduceState(state, action);
      expect(next.get('mappingNode')).toEqual(
        OrderedMap({ somekey: action.value })
      );
    });

    it('resets mapping node active prop if shouldResetActiveProp is truthy', () => {
      action.shouldResetActiveProp = true;
      next = reduceState(state, action);
      expect(next.get('mappingNodeActiveProp')).toEqual(
        initialState.get('mappingNodeActiveProp')
      );
    });

    it('does not reset mapping node active prop if shouldResetActiveProp is falsey', () => {
      action.shouldResetActiveProp = false;
      next = reduceState(state, action);
      expect(next.get('mappingNodeActiveProp')).toEqual(
        state.get('mappingNodeActiveProp')
      );
    });

    it('adds new key if no matching key found', () => {
      state = initialState.setIn(
        ['mappingNode', 'unknownkey'],
        Map({ source: 'something', column: 'column' })
      );
      next = reduceState(state, action);
      expect(next).toEqual(
        state.setIn(['mappingNode', action.key], action.value)
      );
    });
  });

  describe('when INGESTION_PROFILE_RESET_MAPPING_NODE', () => {
    let next, state, action;
    beforeEach(() => {
      action = {
        type: actions.INGESTION_PROFILE_RESET_MAPPING_NODE
      };
    });

    it('sets newNodeVisible to initial state', () => {
      state = initialState.set('newModeVisible', jest.fn());
      next = reduceState(state, action);
      expect(next.get('newNodeVisible')).toEqual(
        initialState.get('newNodeVisible')
      );
    });

    it('sets editingNodeIndex to initial state', () => {
      state = initialState.set('editingNodeIndex', jest.fn());
      next = reduceState(state, action);
      expect(next.get('editingNodeIndex')).toEqual(
        initialState.get('editingNodeIndex')
      );
    });

    it('sets mappingNode to initial state', () => {
      state = initialState.set('mappingNode', jest.fn());
      next = reduceState(state, action);
      expect(next.get('mappingNode')).toEqual(initialState.get('mappingNode'));
    });

    it('sets mappingNodeActiveProp to initial state', () => {
      state = initialState.set('mappingNodeActiveProp', jest.fn());
      next = reduceState(state, action);
      expect(next.get('mappingNodeActiveProp')).toEqual(
        initialState.get('mappingNodeActiveProp')
      );
    });
  });

  describe('when INGESTION_PROFILE_ADD_MAPPING_NODE', () => {
    let next, state, action;
    beforeEach(() => {
      action = {
        type: actions.INGESTION_PROFILE_ADD_MAPPING_NODE
      };
    });

    it('sets newNodeVisible to initial state', () => {
      state = initialState.set('newModeVisible', jest.fn());
      next = reduceState(state, action);
      expect(next.get('newNodeVisible')).toEqual(
        initialState.get('newNodeVisible')
      );
    });

    it('sets editingNodeIndex to initial state', () => {
      state = initialState.set('editingNodeIndex', jest.fn());
      next = reduceState(state, action);
      expect(next.get('editingNodeIndex')).toEqual(
        initialState.get('editingNodeIndex')
      );
    });

    it('sets mappingNode to initial state', () => {
      state = initialState.set('mappingNode', jest.fn());
      next = reduceState(state, action);
      expect(next.get('mappingNode')).toEqual(initialState.get('mappingNode'));
    });

    it('sets mappingNodeActiveProp to initial state', () => {
      state = initialState.set('mappingNodeActiveProp', jest.fn());
      next = reduceState(state, action);
      expect(next.get('mappingNodeActiveProp')).toEqual(
        initialState.get('mappingNodeActiveProp')
      );
    });
  });

  describe('when INGESTION_PROFILE_UPDATE_MAPPING_NODE', () => {
    let next, state, action;
    beforeEach(() => {
      action = {
        type: actions.INGESTION_PROFILE_UPDATE_MAPPING_NODE
      };
    });

    it('sets newNodeVisible to initial state', () => {
      state = initialState.set('newModeVisible', jest.fn());
      next = reduceState(state, action);
      expect(next.get('newNodeVisible')).toEqual(
        initialState.get('newNodeVisible')
      );
    });

    it('sets editingNodeIndex to initial state', () => {
      state = initialState.set('editingNodeIndex', jest.fn());
      next = reduceState(state, action);
      expect(next.get('editingNodeIndex')).toEqual(
        initialState.get('editingNodeIndex')
      );
    });

    it('sets mappingNode to initial state', () => {
      state = initialState.set('mappingNode', jest.fn());
      next = reduceState(state, action);
      expect(next.get('mappingNode')).toEqual(initialState.get('mappingNode'));
    });

    it('sets mappingNodeActiveProp to initial state', () => {
      state = initialState.set('mappingNodeActiveProp', jest.fn());
      next = reduceState(state, action);
      expect(next.get('mappingNodeActiveProp')).toEqual(
        initialState.get('mappingNodeActiveProp')
      );
    });
  });

  describe('when INGESTION_PROFILE_DELETE_MAPPING_NODE', () => {
    let next, state, action;
    beforeEach(() => {
      action = {
        type: actions.INGESTION_PROFILE_RESET_MAPPING_NODE
      };
    });

    it('sets newNodeVisible to initial state', () => {
      state = initialState.set('newModeVisible', jest.fn());
      next = reduceState(state, action);
      expect(next.get('newNodeVisible')).toEqual(
        initialState.get('newNodeVisible')
      );
    });

    it('sets editingNodeIndex to initial state', () => {
      state = initialState.set('editingNodeIndex', jest.fn());
      next = reduceState(state, action);
      expect(next.get('editingNodeIndex')).toEqual(
        initialState.get('editingNodeIndex')
      );
    });

    it('sets mappingNode to initial state', () => {
      state = initialState.set('mappingNode', jest.fn());
      next = reduceState(state, action);
      expect(next.get('mappingNode')).toEqual(initialState.get('mappingNode'));
    });

    it('sets mappingNodeActiveProp to initial state', () => {
      state = initialState.set('mappingNodeActiveProp', jest.fn());
      next = reduceState(state, action);
      expect(next.get('mappingNodeActiveProp')).toEqual(
        initialState.get('mappingNodeActiveProp')
      );
    });
  });

  describe('when INGESTION_PROFILE_EDIT_MAPPING_NODE', () => {
    let next, action;
    beforeEach(() => {
      action = {
        type: actions.INGESTION_PROFILE_EDIT_MAPPING_NODE
      };
    });

    it('updates editingNodeIndex', () => {
      action.index = 1;
      next = reduceState(initialState, action);
      expect(next.get('editingNodeIndex')).toEqual(action.index);
    });

    it('updates mappingNode', () => {
      action.node = jest.fn();
      next = reduceState(initialState, action);
      expect(next.get('mappingNode')).toEqual(action.node);
    });

    it('resets newNodeVisible to initial state', () => {
      next = reduceState(initialState.set('newNodeVisible', jest.fn()), action);
      expect(next.get('newNodeVisible')).toEqual(
        initialState.get('newNodeVisible')
      );
    });
  });

  describe('when INGESTION_PROFILE_REVEAL_NEW_LINK', () => {
    let next, state, action;
    beforeEach(() => {
      action = {
        type: actions.INGESTION_PROFILE_REVEAL_NEW_LINK
      };
      state = initialState;
    });

    it('updates newLinkVisible to true', () => {
      next = reduceState(state, action);
      expect(next.get('newLinkVisible')).toBe(true);
    });

    it('resets editingLinkIndex to initial state', () => {
      state = initialState.set('editingLinkIndex', jest.fn());
      next = reduceState(state, action);
      expect(next.get('editingLinkIndex')).toEqual(
        initialState.get('editingLinkIndex')
      );
    });

    it('resets mappingLink to initial state', () => {
      state = initialState.set('mappingLink', jest.fn());
      next = reduceState(state, action);
      expect(next.get('mappingLink')).toEqual(initialState.get('mappingLink'));
    });

    it('resets mappingLinkActiveProp to initial state', () => {
      state = initialState.set('mappingLinkActiveProp', jest.fn());
      expect(next.get('mappingLinkActiveProp')).toEqual(
        initialState.get('mappingLinkActiveProp')
      );
    });
  });

  describe('when INGESTION_PROFILE_TOGGLE_MAPPING_LINK_ACTIVE_PROP_KEY', () => {
    let next, action;
    beforeEach(() => {
      action = {
        type: actions.INGESTION_PROFILE_TOGGLE_MAPPING_LINK_ACTIVE_PROP_KEY,
        key: 'something'
      };
    });
    it('resets mapping link active prop to initial state if key exists', () => {
      next = reduceState(
        initialState.set('mappingLinkActiveProp', Map({ key: 'something' })),
        action
      );
      expect(next.get('mappingLinkActiveProp')).toEqual(
        initialState.get('mappingLinkActiveProp')
      );
    });

    it('sets new mapping link active prop if given key does not exist', () => {
      next = reduceState(
        initialState.set('mappingLinkActiveProp', Map({ key: 'otherthing' })),
        action
      );
      expect(next.get('mappingLinkActiveProp')).toEqual(
        Map({ key: action.key, valueActive: false })
      );
    });
  });

  describe('when INGESTION_PROFILE_TOGGLE_MAPPING_LINK_ACTIVE_PROP_VALUE', () => {
    let next, action;
    beforeEach(() => {
      action = {
        type: actions.INGESTION_PROFILE_TOGGLE_MAPPING_LINK_ACTIVE_PROP_VALUE,
        key: 'something'
      };
    });

    it('resets mapping link active prop to initial state if the provided key exists and value is truthy', () => {
      next = reduceState(
        initialState.set(
          'mappingLinkActiveProp',
          Map({ key: 'something', valueActive: true })
        ),
        action
      );
      expect(next.get('mappingLinkActiveProp')).toEqual(
        initialState.get('mappingLinkActiveProp')
      );
    });

    it('sets new mapping link active prop key if the given key exists but value is falthy', () => {
      next = reduceState(
        initialState.set(
          'mappingLinkActiveProp',
          Map({ key: 'something', valueActive: null })
        ),
        action
      );
      expect(next.get('mappingLinkActiveProp')).toEqual(
        Map({ key: action.key, valueActive: true })
      );
    });

    it('sets new mapping link active prop key if the given key does not exist', () => {
      next = reduceState(
        initialState.set('mappingLinkActiveProp', Map({ key: 'otherthing' })),
        action
      );
      expect(next.get('mappingLinkActiveProp')).toEqual(
        Map({ key: action.key, valueActive: true })
      );
    });
  });

  describe('when INGESTION_PROFILE_SET_MAPPING_LINK_PROP_VALUE', () => {
    let next, state, action;
    beforeEach(() => {
      action = {
        type: actions.INGESTION_PROFILE_SET_MAPPING_LINK_PROP_VALUE,
        key: 'somekey',
        value: jest.fn()
      };
      state = initialState
        .setIn(
          ['mappingLink', 'somekey'],
          Map({ source: 'something', column: 'column' })
        )
        .set('mappingLinkActiveProp', jest.fn());
    });

    it('updates the matching mapping link value', () => {
      next = reduceState(state, action);
      expect(next.get('mappingLink')).toEqual(
        OrderedMap({ somekey: action.value })
      );
    });

    it('resets mapping link active prop if shouldResetActiveLink is truthy', () => {
      action.shouldResetActiveLink = true;
      next = reduceState(state, action);
      expect(next.get('mappingLinkActiveProp')).toEqual(
        initialState.get('mappingLinkActiveProp')
      );
    });

    it('does not reset mapping link active prop if shouldResetActiveLink is falsey', () => {
      action.shouldResetActiveLink = false;
      next = reduceState(state, action);
      expect(next.get('mappingLinkActiveProp')).toEqual(
        state.get('mappingLinkActiveProp')
      );
    });

    it('adds new key if no matching key found', () => {
      state = initialState.setIn(
        ['mappingLink', 'unknownkey'],
        Map({ source: 'something', column: 'column' })
      );
      next = reduceState(state, action);
      expect(next).toEqual(
        state.setIn(['mappingLink', action.key], action.value)
      );
    });
  });

  describe('when INGESTION_PROFILE_RESET_MAPPING_LINK', () => {
    let next, state, action;
    beforeEach(() => {
      action = {
        type: actions.INGESTION_PROFILE_RESET_MAPPING_LINK
      };
    });

    it('sets newLinkVisible to initial state', () => {
      state = initialState.set('newLinkVisible', jest.fn());
      next = reduceState(state, action);
      expect(next.get('newLinkVisible')).toEqual(
        initialState.get('newLinkVisible')
      );
    });

    it('sets editingLinkIndex to initial state', () => {
      state = initialState.set('editingLinkIndex', jest.fn());
      next = reduceState(state, action);
      expect(next.get('editingLinkIndex')).toEqual(
        initialState.get('editingLinkIndex')
      );
    });

    it('sets mappingLink to initial state', () => {
      state = initialState.set('mappingLink', jest.fn());
      next = reduceState(state, action);
      expect(next.get('mappingLink')).toEqual(initialState.get('mappingLink'));
    });

    it('sets mappingLinkActiveProp to initial state', () => {
      state = initialState.set('mappingLinkActiveProp', jest.fn());
      next = reduceState(state, action);
      expect(next.get('mappingLinkActiveProp')).toEqual(
        initialState.get('mappingLinkActiveProp')
      );
    });
  });

  describe('when INGESTION_PROFILE_ADD_MAPPING_LINK', () => {
    let next, state, action;
    beforeEach(() => {
      action = {
        type: actions.INGESTION_PROFILE_ADD_MAPPING_LINK
      };
    });

    it('sets newLinkVisible to initial state', () => {
      state = initialState.set('newLinkVisible', jest.fn());
      next = reduceState(state, action);
      expect(next.get('newLinkVisible')).toEqual(
        initialState.get('newLinkVisible')
      );
    });

    it('sets editingLinkIndex to initial state', () => {
      state = initialState.set('editingLinkIndex', jest.fn());
      next = reduceState(state, action);
      expect(next.get('editingLinkIndex')).toEqual(
        initialState.get('editingLinkIndex')
      );
    });

    it('sets mappingLink to initial state', () => {
      state = initialState.set('mappingLink', jest.fn());
      next = reduceState(state, action);
      expect(next.get('mappingLink')).toEqual(initialState.get('mappingLink'));
    });

    it('sets mappingLinkActiveProp to initial state', () => {
      state = initialState.set('mappingLinkActiveProp', jest.fn());
      next = reduceState(state, action);
      expect(next.get('mappingLinkActiveProp')).toEqual(
        initialState.get('mappingLinkActiveProp')
      );
    });
  });

  describe('when INGESTION_PROFILE_UPDATE_MAPPING_LINK', () => {
    let next, state, action;
    beforeEach(() => {
      action = {
        type: actions.INGESTION_PROFILE_UPDATE_MAPPING_LINK
      };
    });

    it('sets newLinkVisible to initial state', () => {
      state = initialState.set('newLinkVisible', jest.fn());
      next = reduceState(state, action);
      expect(next.get('newLinkVisible')).toEqual(
        initialState.get('newLinkVisible')
      );
    });

    it('sets editingLinkIndex to initial state', () => {
      state = initialState.set('editingLinkIndex', jest.fn());
      next = reduceState(state, action);
      expect(next.get('editingLinkIndex')).toEqual(
        initialState.get('editingLinkIndex')
      );
    });

    it('sets mappingLink to initial state', () => {
      state = initialState.set('mappingLink', jest.fn());
      next = reduceState(state, action);
      expect(next.get('mappingLink')).toEqual(initialState.get('mappingLink'));
    });

    it('sets mappingLinkActiveProp to initial state', () => {
      state = initialState.set('mappingLinkActiveProp', jest.fn());
      next = reduceState(state, action);
      expect(next.get('mappingLinkActiveProp')).toEqual(
        initialState.get('mappingLinkActiveProp')
      );
    });
  });

  describe('when INGESTION_PROFILE_DELETE_MAPPING_LINK', () => {
    let next, state, action;
    beforeEach(() => {
      action = {
        type: actions.INGESTION_PROFILE_DELETE_MAPPING_LINK
      };
    });

    it('sets newLinkVisible to initial state', () => {
      state = initialState.set('newLinkVisible', jest.fn());
      next = reduceState(state, action);
      expect(next.get('newLinkVisible')).toEqual(
        initialState.get('newLinkVisible')
      );
    });

    it('sets editingLinkIndex to initial state', () => {
      state = initialState.set('editingLinkIndex', jest.fn());
      next = reduceState(state, action);
      expect(next.get('editingLinkIndex')).toEqual(
        initialState.get('editingLinkIndex')
      );
    });

    it('sets mappingLink to initial state', () => {
      state = initialState.set('mappingLink', jest.fn());
      next = reduceState(state, action);
      expect(next.get('mappingLink')).toEqual(initialState.get('mappingLink'));
    });

    it('sets mappingLinkActiveProp to initial state', () => {
      state = initialState.set('mappingLinkActiveProp', jest.fn());
      next = reduceState(state, action);
      expect(next.get('mappingLinkActiveProp')).toEqual(
        initialState.get('mappingLinkActiveProp')
      );
    });
  });

  describe('when INGESTION_PROFILE_DELETE_MAPPING_LINK_PROP', () => {
    let next, action;

    beforeEach(() => {
      action = {
        type: actions.INGESTION_PROFILE_DELETE_MAPPING_LINK_PROP,
        key: 'somekey'
      };
    });

    it('deletes the matching mapping link', () => {
      const state = initialState.setIn(
          ['mappingLink', 'somekey'],
          Map({ source: 'something', column: 'column' })
        ),
        next = reduceState(state, action);
      expect(next).toEqual(initialState);
    });

    it('does nothing if no matching key found', () => {
      const state = initialState.setIn(
          ['mappingLink', 'otherkey'],
          Map({ source: 'something', column: 'column' })
        ),
        next = reduceState(state, action);
      expect(next).toEqual(state);
    });
  });

  describe('when INGESTION_PROFILE_ADD_MAPPING_LINK_PROP', () => {
    let next, action;
    beforeEach(() => {
      action = {
        type: actions.INGESTION_PROFILE_ADD_MAPPING_LINK_PROP
      };
    });
    it('adds a new empty mapping link to state', () => {
      next = reduceState(initialState, action);
      expect(next).toEqual(
        initialState.setIn(['mappingLink', ''], Map({ source: '', column: '' }))
      );
    });

    it('does nothing when an empty mapping link already exists', () => {
      const state = initialState.setIn(['mappingLink', ''], jest.fn());
      next = reduceState(state, action);
      expect(next).toEqual(state);
    });
  });

  describe('when INGESTION_PROFILE_SET_MAPPING_LINK_PROP_KEY', () => {
    let next, state, action;
    beforeEach(() => {
      action = {
        type: actions.INGESTION_PROFILE_SET_MAPPING_LINK_PROP_KEY,
        prevKey: 'somekey',
        key: 'otherkey'
      };
      state = initialState
        .setIn(
          ['mappingLink', 'somekey'],
          Map({ source: 'something', column: 'column' })
        )
        .set('mappingLinkActiveProp', jest.fn());
    });

    it('renames the matching mapping link key', () => {
      next = reduceState(state, action);
      expect(next.get('mappingLink')).toEqual(
        OrderedMap({ otherkey: Map({ source: 'something', column: 'column' }) })
      );
    });

    it('resets mapping link active prop to initial state', () => {
      next = reduceState(state, action);
      expect(next.get('mappingLinkActiveProp')).toEqual(
        initialState.get('mappingLinkActiveProp')
      );
    });

    it('does nothing if no matching key found', () => {
      state = initialState
        .setIn(
          ['mappingLink', 'unknownkey'],
          Map({ source: 'something', column: 'column' })
        )
        .set('mappingLinkActiveProp', jest.fn());
      next = reduceState(state, action);
      expect(next).toEqual(state);
    });
  });

  describe('when INGESTION_PROFILE_EDIT_MAPPING_LINK', () => {
    let next, action;
    beforeEach(() => {
      action = {
        type: actions.INGESTION_PROFILE_EDIT_MAPPING_LINK
      };
    });

    it('updates editingNodeIndex', () => {
      action.index = 1;
      next = reduceState(initialState, action);
      expect(next.get('editingLinkIndex')).toEqual(action.index);
    });

    it('updates mappingLink', () => {
      action.link = jest.fn();
      next = reduceState(initialState, action);
      expect(next.get('mappingLink')).toEqual(action.link);
    });

    it('resets newLinkVisible to initial state', () => {
      next = reduceState(initialState.set('newLinkVisible', jest.fn()), action);
      expect(next.get('newLinkVisible')).toEqual(
        initialState.get('newLinkVisible')
      );
    });
  });

  describe('when other actions are dispatched', () => {
    it('returns same state', () => {
      const action = {
        type: 'other actions'
      };
      const next = reduceState(initialState, action);
      expect(next).toEqual(initialState);
    });
  });

  describe('when no state is given', () => {
    it('uses initial state', () => {
      const action = {
        type: 'other actions'
      };
      const next = reduceState(undefined, action);
      expect(next).toEqual(initialState);
    });
  });
});
