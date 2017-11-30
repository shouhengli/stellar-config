import { fromJS } from 'immutable';
import {
  editorContentSelector,
  shouldUpdateClassLinkLengthsSelector,
  dimensionsSelector,
  coordinatesSelector,
  panSelector,
  zoomSelector,
  dragSelector
} from '../graph-schema';

describe('graph schema selectors', () => {
  describe('#editorContentSelector', () => {
    it('select the editContent value from ui graph schema', () => {
      const state = fromJS({
        ui: {
          graphSchema: {
            editorContent: jest.fn()
          }
        }
      });
      expect(editorContentSelector(state)).toEqual(
        state.getIn(['ui', 'graphSchema', 'editorContent'])
      );
    });
  });

  describe('#shouldUpdateClassLinkLengthsSelector', () => {
    it('select shouldUpdateClassLinkLengths value from ui graph schema', () => {
      const state = fromJS({
        ui: {
          graphSchema: {
            shouldUpdateClassLinkLengths: jest.fn()
          }
        }
      });
      expect(shouldUpdateClassLinkLengthsSelector(state)).toEqual(
        state.getIn(['ui', 'graphSchema', 'shouldUpdateClassLinkLengths'])
      );
    });
  });

  describe('#dimensionsSelector', () => {
    it('select dimensions value from ui graph schema', () => {
      const state = fromJS({
        ui: {
          graphSchema: {
            dimensions: jest.fn()
          }
        }
      });
      expect(dimensionsSelector(state)).toEqual(
        state.getIn(['ui', 'graphSchema', 'dimensions'])
      );
    });
  });

  describe('#coordinatesSelector', () => {
    it('select coordinates value from ui graph schema', () => {
      const state = fromJS({
        ui: {
          graphSchema: {
            coordinates: jest.fn()
          }
        }
      });
      expect(coordinatesSelector(state)).toEqual(
        state.getIn(['ui', 'graphSchema', 'coordinates'])
      );
    });
  });

  describe('#panSelector', () => {
    it('select pan value from ui graph schema', () => {
      const state = fromJS({
        ui: {
          graphSchema: {
            pan: jest.fn()
          }
        }
      });
      expect(panSelector(state)).toEqual(
        state.getIn(['ui', 'graphSchema', 'pan'])
      );
    });
  });

  describe('#zoomSelector', () => {
    it('select zoom value from ui graph schema', () => {
      const state = fromJS({
        ui: {
          graphSchema: {
            zoom: jest.fn()
          }
        }
      });
      expect(zoomSelector(state)).toEqual(
        state.getIn(['ui', 'graphSchema', 'zoom'])
      );
    });
  });

  describe('#dragSelector', () => {
    it('select drag value from ui graph schema', () => {
      const state = fromJS({
        ui: {
          graphSchema: {
            drag: jest.fn()
          }
        }
      });
      expect(dragSelector(state)).toEqual(
        state.getIn(['ui', 'graphSchema', 'drag'])
      );
    });
  });
});
