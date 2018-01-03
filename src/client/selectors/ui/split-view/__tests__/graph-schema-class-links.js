import { fromJS } from 'immutable';
import {
  classLinksSelector,
  classLinkPositionsSelector
} from '../graph-schema-class-links';

describe('graph schema class links selectors', () => {
  describe('#classLinksSelector', () => {
    it('select graphSchemaClassLinks from ui graph schema', () => {
      const state = fromJS({
        ui: {
          splitView: {
            graphSchemaClassLinks: jest.fn()
          }
        }
      });
      expect(classLinksSelector(state)).toEqual(
        state.getIn(['ui', 'splitView', 'graphSchemaClassLinks'])
      );
    });
  });

  describe('#classLinkPositionsSelector', () => {
    it('select graphSchemaClassLinkPositions from ui graph schema', () => {
      const state = fromJS({
        ui: {
          splitView: {
            graphSchemaClassLinkPositions: jest.fn()
          }
        }
      });
      expect(classLinkPositionsSelector(state)).toEqual(
        state.getIn(['ui', 'splitView', 'graphSchemaClassLinkPositions'])
      );
    });
  });
});
