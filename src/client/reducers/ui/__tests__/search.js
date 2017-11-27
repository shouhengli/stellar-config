import { List, fromJS } from 'immutable';
import reduceState from '../search';
import actions from '../../../actions';

describe('reducer ui/search', () => {
  let initialState;

  beforeEach(() => {
    initialState = fromJS({
      names: [],
      visible: false,
      text: ''
    });
  });

  describe('when SEARCH_LOAD_NAMES', () => {
    it('updates config names', () => {
      const action = {
        type: actions.SEARCH_LOAD_NAMES,
        configNames: ['people', 'vehicles']
      };
      const next = reduceState(initialState, action);
      const expected = initialState.set('names', List(action.configNames));

      expect(next).toEqual(expected);
    });
  });

  describe('when SEARCH_SET_TEXT', () => {
    it('updates search text', () => {
      const action = {
        type: actions.SEARCH_SET_TEXT,
        searchText: 'people'
      };
      const next = reduceState(initialState, action);
      const expected = initialState.set('text', action.searchText);

      expect(next).toEqual(expected);
    });
  });

  describe('when SEARCH_HIDE', () => {
    it('hides search', () => {
      const state = initialState.set('visible', true);
      const action = { type: actions.SEARCH_HIDE };
      const next = reduceState(state, action);
      const expected = state.set('visible', false);

      expect(next).toEqual(expected);
    });
  });

  describe('when SEARCH_REVEAL', () => {
    it('reveals search', () => {
      const state = initialState.set('visible', false);
      const action = { type: actions.SEARCH_REVEAL };
      const next = reduceState(state, action);

      const expected = state.set('visible', true);
      expect(next).toEqual(expected);
    });
  });

  describe('when other actions', () => {
    it('leaves state untouched', () => {
      const state = initialState.set('visible', false);
      const action = { type: 'some action' };
      const next = reduceState(state, action);
      expect(next).toEqual(state);
    });
  });

  describe('when no state given', () => {
    it('fallbacks to initial state', () => {
      const action = { type: 'some action' };
      const next = reduceState(undefined, action);
      expect(next).toEqual(initialState);
    });
  });
});
