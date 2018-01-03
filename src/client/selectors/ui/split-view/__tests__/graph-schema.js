import { fromJS } from 'immutable';
import {
  shouldUpdateClassLinkLengthsSelector,
  dimensionsSelector,
  coordinatesSelector,
  panSelector,
  zoomSelector,
  dragSelector
} from '../graph-schema';

describe('graph schema selectors', () => {
  describe('#shouldUpdateClassLinkLengthsSelector', () => {
    it('select shouldUpdateClassLinkLengths value from ui graph schema', () => {
      const state = fromJS({
        ui: {
          splitView: {
            graphSchema: {
              shouldUpdateClassLinkLengths: jest.fn()
            }
          }
        }
      });
      expect(shouldUpdateClassLinkLengthsSelector(state)).toEqual(
        state.getIn([
          'ui',
          'splitView',
          'graphSchema',
          'shouldUpdateClassLinkLengths'
        ])
      );
    });
  });

  describe('#dimensionsSelector', () => {
    it('select dimensions value from ui graph schema', () => {
      const state = fromJS({
        ui: {
          splitView: {
            graphSchema: {
              dimensions: jest.fn()
            }
          }
        }
      });
      expect(dimensionsSelector(state)).toEqual(
        state.getIn(['ui', 'splitView', 'graphSchema', 'dimensions'])
      );
    });
  });

  describe('#coordinatesSelector', () => {
    it('select coordinates value from ui graph schema', () => {
      const state = fromJS({
        ui: {
          splitView: {
            graphSchema: {
              coordinates: jest.fn()
            }
          }
        }
      });
      expect(coordinatesSelector(state)).toEqual(
        state.getIn(['ui', 'splitView', 'graphSchema', 'coordinates'])
      );
    });
  });

  describe('#panSelector', () => {
    it('select pan value from ui graph schema', () => {
      const state = fromJS({
        ui: {
          splitView: {
            graphSchema: {
              pan: jest.fn()
            }
          }
        }
      });
      expect(panSelector(state)).toEqual(
        state.getIn(['ui', 'splitView', 'graphSchema', 'pan'])
      );
    });
  });

  describe('#zoomSelector', () => {
    it('select zoom value from ui graph schema', () => {
      const state = fromJS({
        ui: {
          splitView: {
            graphSchema: {
              zoom: jest.fn()
            }
          }
        }
      });
      expect(zoomSelector(state)).toEqual(
        state.getIn(['ui', 'splitView', 'graphSchema', 'zoom'])
      );
    });
  });

  describe('#dragSelector', () => {
    it('select drag value from ui graph schema', () => {
      const state = fromJS({
        ui: {
          splitView: {
            graphSchema: {
              drag: jest.fn()
            }
          }
        }
      });
      expect(dragSelector(state)).toEqual(
        state.getIn(['ui', 'splitView', 'graphSchema', 'drag'])
      );
    });
  });
});
