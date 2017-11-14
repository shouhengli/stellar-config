const {is, fromJS} = require('immutable');
const reduceState = require('../ingestion-profile');
const actions = require('../../../actions');

describe('reducer ui/ingestion-profile', () => {
  let initialState;

  beforeEach(() => {
    initialState = fromJS({
      newConfigVisible: false,
      newConfigName: '',
      deleteConfigVisible: false,
      deleteConfigName: '',
      selectedSource: '',
      newSource: '',
      newSourceVisible: false,
      deleteSourceVisible: false,
      sample: null,
    });
  });

  describe('when INGESTION_PROFILE_REVEAL_NEW', () => {
    test('reveals new file UI', () => {
      const state = initialState.set('newConfigVisible', false);
      const action = {type: actions.INGESTION_PROFILE_REVEAL_NEW};
      const next = reduceState(state, action);

      const expected = state.set('newConfigVisible', true);
      expect(is(next, expected)).toBe(true);
    });
  });

  describe('when INGESTION_PROFILE_HIDE_NEW', () => {
    test('hides new file UI', () => {
      const state = initialState.set('newConfigVisible', true);
      const action = {type: actions.INGESTION_PROFILE_HIDE_NEW};
      const next = reduceState(state, action);

      const expected = state.set('newConfigVisible', false);
      expect(is(next, expected)).toBe(true);
    });
  });

  describe('when INGESTION_PROFILE_SET_NEW_NAME', () => {
    test('updates name of new file', () => {
      const action = {
        type: actions.INGESTION_PROFILE_SET_NEW_NAME,
        name: 'people',
      };

      const next = reduceState(initialState, action);

      const expected = initialState.set('newConfigName', 'people');
      expect(is(next, expected)).toBe(true);
    });
  });

  describe('when INGESTION_PROFILE_HIDE_DELETE', () => {
    test('hides delete file UI', () => {
      const state = initialState.set('deleteConfigVisible', true);
      const action = {type: actions.INGESTION_PROFILE_HIDE_DELETE};
      const next = reduceState(state, action);

      const expected = state.set('deleteConfigVisible', false);
      expect(is(next, expected)).toBe(true);
    });
  });

  describe('when INGESTION_PROFILE_REVEAL_DELETE', () => {
    test('reveals delete file UI', () => {
      const state = initialState.set('deleteConfigVisible', false);
      const action = {type: actions.INGESTION_PROFILE_REVEAL_DELETE};
      const next = reduceState(state, action);

      const expected = state.set('deleteConfigVisible', true);
      expect(is(next, expected)).toBe(true);
    });
  });

  describe('when INGESTION_PROFILE_SET_DELETE_NAME', () => {
    test('updates name of file to be deleted', () => {
      const action = {
        type: actions.INGESTION_PROFILE_SET_DELETE_NAME,
        name: 'people',
      };

      const next = reduceState(initialState, action);

      const expected = initialState.set('deleteConfigName', 'people');
      expect(is(next, expected)).toBe(true);
    });
  });

  describe('when INGESTION_PROFILE_SET_SELECTED_SOURCE', () => {
    test('selects source with specified URI', () => {
      const action = {
        type: actions.INGESTION_PROFILE_SET_SELECTED_SOURCE,
        source: 'http://source.me/people.csv',
      };

      const next = reduceState(initialState, action);

      const expected = initialState.set('selectedSource', action.source);
      expect(is(next, expected)).toBe(true);
    });
  });

  describe('when INGESTION_PROFILE_SET_NEW_SOURCE', () => {
    test('sets new source URI', () => {
      const action = {
        type: actions.INGESTION_PROFILE_SET_NEW_SOURCE,
        source: 'http://source.me/people.csv',
      };

      const next = reduceState(initialState, action);

      const expected = initialState.set('newSource', action.source);
      expect(is(next, expected)).toBe(true);
    });
  });

  describe('when INGESTION_PROFILE_HIDE_NEW_SOURCE', () => {
    test('hides new source', () => {
      const action = {type: actions.INGESTION_PROFILE_HIDE_NEW_SOURCE};

      const next = reduceState(
        initialState.set('newSourceVisible', true),
        action
      );

      expect(is(next, initialState)).toBe(true);
    });
  });

  describe('when INGESTION_PROFILE_REVEAL_NEW_SOURCE', () => {
    test('reveals new source', () => {
      const action = {type: actions.INGESTION_PROFILE_REVEAL_NEW_SOURCE};

      const next = reduceState(initialState, action);

      const expected = initialState.set('newSourceVisible', true);
      expect(is(next, expected)).toBe(true);
    });
  });

  describe('when INGESTION_PROFILE_ADD_SOURCE', () => {
    test('resets new source URI and hides new source', () => {
      const action = {type: actions.INGESTION_PROFILE_ADD_SOURCE};

      const next = reduceState(
        initialState
          .set('newSource', 'http://source.me/vehicles.csv')
          .set('newSourceVisible', true),
        action
      );

      expect(is(next, initialState)).toBe(true);
    });
  });

  describe('when INGESTION_PROFILE_LOAD_SAMPLE', () => {
    test('loads sample', () => {
      const action = {
        type: actions.INGESTION_PROFILE_LOAD_SAMPLE,
        sample: {
          headers: ['A', 'B'],
          rows: [
            [0, 1],
            [5, 6],
          ],
        },
      };

      const next = reduceState(initialState, action);

      const expected = initialState .set('sample', fromJS(action.sample));
      expect(is(next, expected)).toBe(true);
    });
  });

  describe('when INGESTION_PROFILE_HIDE_DELETE_SOURCE', () => {
    test('hides delete source', () => {
      const action = {type: actions.INGESTION_PROFILE_HIDE_DELETE_SOURCE};

      const next = reduceState(
        initialState.set('deleteSourceVisible', true),
        action
      );

      expect(is(next, initialState)).toBe(true);
    });
  });

  describe('when INGESTION_PROFILE_REVEAL_DELETE_SOURCE', () => {
    test('hides delete source', () => {
      const action = {type: actions.INGESTION_PROFILE_REVEAL_DELETE_SOURCE};

      const next = reduceState(initialState, action);

      const expected = initialState.set('deleteSourceVisible', true);
      expect(is(next, expected)).toBe(true);
    });
  });
});
