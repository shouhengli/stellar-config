const {Map, is} = require('immutable');
const reduceState = require('../edit');
const actions = require('../../actions');

const {
  CONFIG_STATUS_NORMAL,
  CONFIG_STATUS_CHANGED,
} = require('../../config-status');

describe('reducer edit', () => {
  let initialState;

  beforeEach(() => {
    initialState = Map({
      type: 'graph schema',
      name: 'package',
      content: 'Package: {id: integer}',
      status: CONFIG_STATUS_NORMAL,
    });
  });

  describe('when LOAD_EDIT_CONFIG', () => {
    test('sets config status to normal', () => {
      const action = {
        type: actions.LOAD_EDIT_CONFIG,
        configType: 'source',
        configName: 'people',
        configContent: 'definition of people',
      };

      const next = reduceState(initialState, action);

      const expected = initialState
        .set('type', action.configType)
        .set('name', action.configName)
        .set('content', action.configContent)
        .set('status', CONFIG_STATUS_NORMAL);

      expect(is(next, expected)).toBe(true);
    });
  });

  describe('when SET_EDIT_CONFIG_CONTENT', () => {
    test('sets config status to changed', () => {
      const action = {
        type: actions.SET_EDIT_CONFIG_CONTENT,
        configContent: 'Package: {id: integer, from: Place}',
      };

      const next = reduceState(initialState, action);

      const expected = initialState
        .set('content', action.configContent)
        .set('status', CONFIG_STATUS_CHANGED);

      expect(is(next, expected)).toBe(true);
    });
  });

  describe('when SET_EDIT_CONFIG_STATUS', () => {
    test('updates config status', () => {
      const action = {
        type: actions.SET_EDIT_CONFIG_STATUS,
        configStatus: CONFIG_STATUS_CHANGED,
      };

      const next = reduceState(initialState, action);

      const expected = initialState.set('status', CONFIG_STATUS_CHANGED);

      expect(is(next, expected)).toBe(true);
    });
  });

  describe('when RESET_EDIT_CONFIG', () => {
    test('sets config status to normal', () => {
      const action = {type: actions.RESET_EDIT_CONFIG};

      const next = reduceState(initialState, action);

      const expected = initialState
        .set('type', null)
        .set('name', null)
        .set('content', Map())
        .set('status', CONFIG_STATUS_NORMAL);

      expect(is(next, expected)).toBe(true);
    });
  });
});
