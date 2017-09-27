const {is, fromJS} = require('immutable');
const reduceState = require('../ui');
const actions = require('../../actions');

describe('reducer ui', () => {
  let initialState;

  beforeEach(() => {
    initialState = fromJS({
      newConfigVisible: false,
      newConfigType: '',
      newConfigName: '',
      configDeleteVisible: false,
      configDeleteName: '',
    });
  });

  describe('when REVEAL_NEW_CONFIG', () => {
    test('reveals new config', () => {
      const state = initialState.set('newConfigVisible', false);
      const action = {type: actions.REVEAL_NEW_CONFIG};
      const next = reduceState(state, action);

      const expected = state.set('newConfigVisible', true);
      expect(is(next, expected)).toBe(true);
    });
  });

  describe('when HIDE_NEW_CONFIG', () => {
    test('hides new config', () => {
      const state = initialState.set('newConfigVisible', true);
      const action = {type: actions.HIDE_NEW_CONFIG};
      const next = reduceState(state, action);

      const expected = state.set('newConfigVisible', false);
      expect(is(next, expected)).toBe(true);
    });
  });

  describe('when SET_NEW_CONFIG_TYPE', () => {
    test('updates type of new config', () => {
      const action = {
        type: actions.SET_NEW_CONFIG_TYPE,
        configType: 'source',
      };

      const next = reduceState(initialState, action);

      const expected = initialState.set('newConfigType', 'source');
      expect(is(next, expected)).toBe(true);
    });
  });

  describe('when SET_NEW_CONFIG_NAME', () => {
    test('updates name of new config', () => {
      const action = {
        type: actions.SET_NEW_CONFIG_NAME,
        configName: 'people',
      };

      const next = reduceState(initialState, action);

      const expected = initialState.set('newConfigName', 'people');
      expect(is(next, expected)).toBe(true);
    });
  });

  describe('when ADD_NEW_CONFIG', () => {
    test('resets name and type of new config', () => {
      const state = initialState
        .set('newConfigName', 'people')
        .set('newConfigType', 'source');

      const action = {type: actions.ADD_NEW_CONFIG};
      const next = reduceState(state, action);

      expect(is(next, initialState)).toBe(true);
    });
  });

  describe('when HIDE_CONFIG_DELETE', () => {
    test('hides config delete', () => {
      const state = initialState.set('configDeleteVisible', true);
      const action = {type: actions.HIDE_CONFIG_DELETE};
      const next = reduceState(state, action);

      const expected = state.set('configDeleteVisible', false);
      expect(is(next, expected)).toBe(true);
    });
  });

  describe('when REVEAL_CONFIG_DELETE', () => {
    test('reveals config delete', () => {
      const state = initialState.set('configDeleteVisible', false);
      const action = {type: actions.REVEAL_CONFIG_DELETE};
      const next = reduceState(state, action);

      const expected = state.set('configDeleteVisible', true);
      expect(is(next, expected)).toBe(true);
    });
  });

  describe('when SET_CONFIG_DELETE_NAME', () => {
    test('updates name of config delete', () => {
      const action = {
        type: actions.SET_CONFIG_DELETE_NAME,
        configName: 'people',
      };

      const next = reduceState(initialState, action);

      const expected = initialState.set('configDeleteName', 'people');
      expect(is(next, expected)).toBe(true);
    });
  });
});
