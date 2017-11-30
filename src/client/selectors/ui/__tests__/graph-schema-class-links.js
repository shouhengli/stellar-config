import { fromJS } from 'immutable';
import { classLinksSelector } from '../graph-schema-class-links';

describe('graph schema class links selectors', () => {
  describe('#classLinksSelector', () => {
    it('select the graphSchemaClassLinks from ui graph schema', () => {
      const state = fromJS({
        ui: {
          graphSchemaClassLinks: jest.fn()
        }
      });
      expect(classLinksSelector(state)).toEqual(
        state.getIn(['ui', 'graphSchemaClassLinks'])
      );
    });
  });
});
