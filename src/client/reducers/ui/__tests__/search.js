const {List, is, fromJS} = require('immutable');
const reduceState = require('../search');
const actions = require('../../../actions');

describe('reducer ui/search', () => {
  let initialState;

  beforeEach(() => {
    initialState = fromJS({
      types: [],
      names: [],
      activeType: null,
      visible: false,
      text: '',
    });
  });

  describe('when SEARCH_LOAD_CONFIG_TYPES', () => {
    test('updates active type if needed and possible', () => {
      const state = initialState.set('activeType', 'source');

      const action1 = {
        type: actions.SEARCH_LOAD_CONFIG_TYPES,
        configTypes: ['mapping', 'graph schema'],
      };

      const action2 = {
        type: actions.SEARCH_LOAD_CONFIG_TYPES,
        configTypes: ['source', 'mapping', 'graph schema'],
      };


      const first = reduceState(state, action1);
      const second = reduceState(first, action2);

      const expected1 = state
        .set('types', List(action1.configTypes))
        .set('activeType', 'mapping');

      const expected2 = expected1.set('types', List(action2.configTypes));

      expect(is(first, expected1)).toBe(true);
      expect(is(second, expected2)).toBe(true);
    });
  });

  describe('when SEARCH_LOAD_CONFIG_NAMES', () => {
    test('updates config names', () => {
      const action = {
        type: actions.SEARCH_LOAD_CONFIG_NAMES,
        configNames: ['people', 'vehicles'],
      };

      const next = reduceState(initialState, action);

      const expected = initialState.set('names', List(action.configNames));
      expect(is(next, expected)).toBe(true);
    });
  });

  describe('when SEARCH_SET_ACTIVE_CONFIG_TYPE', () => {
    test('updates active type', () => {
      const action = {
        type: actions.SEARCH_SET_ACTIVE_CONFIG_TYPE,
        activeConfigType: 'mapping',
      };

      const next = reduceState(initialState, action);

      const expected = initialState.set('activeType', action.activeConfigType);
      expect(is(next, expected)).toBe(true);
    });
  });

  describe('when SEARCH_SET_TEXT', () => {
    test('updates search text', () => {
      const action = {
        type: actions.SEARCH_SET_TEXT,
        searchText: 'people',
      };

      const next = reduceState(initialState, action);

      const expected = initialState.set('text', action.searchText);
      expect(is(next, expected)).toBe(true);
    });
  });

  describe('when SEARCH_HIDE', () => {
    test('hides search', () => {
      const state = initialState.set('visible', true);
      const action = {type: actions.SEARCH_HIDE};
      const next = reduceState(state, action);

      const expected = state.set('visible', false);
      expect(is(next, expected)).toBe(true);
    });
  });

  describe('when SEARCH_REVEAL', () => {
    test('reveals search', () => {
      const state = initialState.set('visible', false);
      const action = {type: actions.SEARCH_REVEAL};
      const next = reduceState(state, action);

      const expected = state.set('visible', true);
      expect(is(next, expected)).toBe(true);
    });
  });
});
