import { fromJS } from 'immutable';
import {
  classPositionsSelector,
  classesSelector,
  selectedClassIndexSelector,
  selectedClassSelector
} from '../graph-schema-classes';

describe('graph schema classes selectors', () => {
  describe('#classPositionsSelector', () => {
    it('select the graphSchemaClassPositions value from ui graph schema', () => {
      const state = fromJS({
        ui: {
          splitView: {
            graphSchemaClassPositions: jest.fn()
          }
        }
      });
      expect(classPositionsSelector(state)).toEqual(
        state.getIn(['ui', 'splitView', 'graphSchemaClassPositions'])
      );
    });
  });

  describe('#classesSelector', () => {
    it('select the graphSchemaClasses value from ui graph schema', () => {
      const state = fromJS({
        ui: {
          splitView: {
            graphSchemaClasses: jest.fn()
          }
        }
      });
      expect(classesSelector(state)).toEqual(
        state.getIn(['ui', 'splitView', 'graphSchemaClasses'])
      );
    });
  });

  describe('#selectedClassIndexSelector', () => {
    it('select the selectedClassIndex value from ui graph schema', () => {
      const state = fromJS({
        ui: {
          splitView: {
            selectedClassIndex: jest.fn()
          }
        }
      });
      expect(selectedClassIndexSelector(state)).toEqual(
        state.getIn(['ui', 'splitView', 'selectedClassIndex'])
      );
    });
  });

  describe('#selectedClassSelector', () => {
    it('select the selectedClass from ui graph schema', () => {
      const state = fromJS({
        ui: {
          splitView: {
            graphSchemaClasses: {
              1: jest.fn()
            },
            selectedClassIndex: '1'
          }
        }
      });
      expect(selectedClassSelector(state)).toEqual(
        state.getIn(['ui', 'splitView', 'graphSchemaClasses', '1'])
      );
    });
  });
});
