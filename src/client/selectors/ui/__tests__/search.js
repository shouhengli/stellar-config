import { fromJS, List } from 'immutable';
import { namesSelector, textSelector, visibleSelector } from '../search';

describe('search selectors', () => {
  describe('#namesSelector', () => {
    it('select the names value from ui search', () => {
      const state = fromJS({
        ui: {
          search: {
            names: jest.fn()
          }
        }
      });
      expect(namesSelector(state)).toEqual(
        state.getIn(['ui', 'search', 'names'])
      );
    });

    it('returns a empty list if neams are not set', () => {
      const state = fromJS({
        ui: {
          search: {}
        }
      });
      expect(namesSelector(state)).toEqual(List());
    });
  });

  describe('#textSelector', () => {
    it('select the text value from ui search', () => {
      const state = fromJS({
        ui: {
          search: {
            text: jest.fn()
          }
        }
      });
      expect(textSelector(state)).toEqual(
        state.getIn(['ui', 'search', 'text'])
      );
    });
  });

  describe('#visibleSelector', () => {
    it('select the "visible" value from ui search', () => {
      const state = fromJS({
        ui: {
          search: {
            visible: jest.fn()
          }
        }
      });
      expect(visibleSelector(state)).toEqual(
        state.getIn(['ui', 'search', 'visible'])
      );
    });
  });
});
