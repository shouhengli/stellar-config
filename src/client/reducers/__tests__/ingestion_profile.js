const {is, fromJS} = require('immutable');
const reduceState = require('../ingestion-profile');
const actions = require('../../actions');

const {
  CONFIG_STATUS_NORMAL,
  CONFIG_STATUS_CHANGED,
} = require('../../config-status');

describe('reducer ingestion-profile', () => {
  let initialState;

  beforeEach(() => {
    initialState = fromJS({
      name: '',
      sources: [],
      status: CONFIG_STATUS_NORMAL,
    });
  });

  describe('when INGESTION_PROFILE_LOAD', () => {
    test('loads ingestion profile', () => {
      const action = {
        type: actions.INGESTION_PROFILE_LOAD,
        name: 'default',
        content: {
          sources: [
            'people.csv',
            'vehicles.csv',
          ],
        },
      };

      const next = reduceState(initialState, action);

      const expected = initialState
        .set('name', action.name)
        .set('sources', fromJS(action.content.sources))
        .set('status', CONFIG_STATUS_NORMAL);

      expect(is(next, expected)).toBe(true);
    });
  });

  describe('when INGESTION_PROFILE_RESET_STATUS', () => {
    test('sets status to normal', () => {
      const action = {type: actions.INGESTION_PROFILE_RESET_STATUS};

      const next = reduceState(
        initialState.set('status', CONFIG_STATUS_CHANGED),
        action
      );

      expect(is(next, initialState)).toBe(true);
    });
  });

  describe('when INGESTION_PROFILE_RESET', () => {
    test('resets to initial state', () => {
      const action = {type: actions.INGESTION_PROFILE_RESET};

      const next = reduceState(
        initialState
          .set('name', action.name)
          .set('sources', fromJS(action.sources))
          .set('status', CONFIG_STATUS_CHANGED),
        action
      );

      expect(is(next, initialState)).toBe(true);
    });
  });

  describe('when INGESTION_PROFILE_ADD_SOURCE', () => {
    test('adds source and sets status to changed', () => {
      const action = {
        type: actions.INGESTION_PROFILE_ADD_SOURCE,
        source: 'people.csv',
      };

      const next = reduceState(initialState, action);

      const expected = initialState
        .set('sources', fromJS([action.source]))
        .set('status', CONFIG_STATUS_CHANGED);

      expect(is(next, expected)).toBe(true);
    });
  });
});
