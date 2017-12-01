import { fromJS } from 'immutable';
import { classesSelector } from '../graph-schema-classes';

describe('graph schema classes selectors', () => {
  describe('#classesSelector', () => {
    it('select the graphSchemaClasses value from ui graph schema', () => {
      const state = fromJS({
        ui: {
          graphSchemaClasses: jest.fn()
        }
      });
      expect(classesSelector(state)).toEqual(
        state.getIn(['ui', 'graphSchemaClasses'])
      );
    });
  });
});
