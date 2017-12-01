import { Map, is, fromJS, List } from 'immutable';
import reduceState from '../graph-schema';
import actions from '../../../actions';

describe('reducer ui/graph-schema', () => {
  let initialState;

  beforeEach(() => {
    initialState = fromJS({
      editorContent: '',
      drag: {},
      shouldUpdateClassLinkLengths: false,
      dimensions: [0, 0],
      coordinates: [0, 0],
      pan: {
        x: 0,
        y: 0
      },
      zoom: 1
    });
  });

  describe('when INGESTION_PROFILE_LOAD', () => {
    it('updates "edtiorContent" with data provided by action', () => {
      const action = {
        type: actions.INGESTION_PROFILE_LOAD,
        content: {
          editorContent: jest.fn()
        }
      };
      const next = reduceState(initialState, action);
      expect(next).toEqual(
        initialState.set('editorContent', action.content.editorContent)
      );
    });

    it('resets "edtiorContent" if no content provided by action', () => {
      const action = {
        type: actions.INGESTION_PROFILE_LOAD
      };
      const next = reduceState(initialState, action);
      expect(next.get('editorContent')).toEqual('');
    });
  });

  describe('when GRAPH_SCHEMA_SET_EDITOR_CONTENT', () => {
    it('updates "edtiorContent" with content provided by action', () => {
      const action = {
        type: actions.GRAPH_SCHEMA_SET_EDITOR_CONTENT,
        content: jest.fn()
      };
      const next = reduceState(initialState, action);
      expect(next).toEqual(initialState.set('editorContent', action.content));
    });

    it('resets "edtiorContent" if no content provided by action', () => {
      const action = {
        type: actions.GRAPH_SCHEMA_SET_EDITOR_CONTENT
      };
      const next = reduceState(initialState, action);
      expect(next.get('editorContent')).toEqual('');
    });
  });

  describe('when GRAPH_SCHEMA_UPDATE_CONTENT', () => {
    it('resets some state fields', () => {
      const state = initialState
        .set('shouldUpdateClassLinkLengths', true)
        .set('pan', Map({ x: 100, y: 200 }))
        .set('zoom', 2);

      const action = { type: actions.GRAPH_SCHEMA_UPDATE_CONTENT };

      const next = reduceState(state, action);

      expect(is(next, initialState)).toBe(true);
    });
  });

  describe('when GRAPH_SCHEMA_START_CLASS_DRAG', () => {
    it('remembers the class being dragged', () => {
      const action = {
        type: actions.GRAPH_SCHEMA_START_CLASS_DRAG,
        name: 'Person',
        fromX: 100,
        fromY: 200
      };
      const next = reduceState(initialState, action);
      const expected = initialState.setIn(
        ['drag', 'class'],
        Map({
          name: action.name,
          fromX: action.fromX,
          fromY: action.fromY
        })
      );

      expect(next).toEqual(expected);
    });
  });

  describe('when GRAPH_SCHEMA_START_CLASS_LINK_DRAG', () => {
    it('remembers the class link being dragged', () => {
      const action = {
        type: actions.GRAPH_SCHEMA_START_CLASS_LINK_DRAG,
        classLink: {
          name: 'has',
          source: 'Person',
          target: 'Car'
        },
        fromX: 100,
        fromY: 200
      };

      const next = reduceState(initialState, action);

      const expected = initialState.setIn(
        ['drag', 'classLink'],
        Map({
          name: 'has',
          source: 'Person',
          target: 'Car',
          fromX: action.fromX,
          fromY: action.fromY
        })
      );

      expect(next.equals(expected)).toBeTruthy();
    });
  });

  describe('when GRAPH_SCHEMA_START_PAN', () => {
    it('remembers the "from" position', () => {
      const action = {
        type: actions.GRAPH_SCHEMA_START_PAN,
        fromX: 100,
        fromY: 200
      };
      const next = reduceState(initialState, action);
      const expected = initialState.setIn(
        ['drag', 'pan'],
        Map({
          fromX: action.fromX,
          fromY: action.fromY
        })
      );

      expect(next).toEqual(expected);
    });
  });

  describe('when GRAPH_SCHEMA_STOP_DRAG', () => {
    it('resets drag field', () => {
      const state = initialState.setIn(
        ['drag', 'class'],
        Map({
          name: 'Person',
          fromX: 10,
          fromY: 20
        })
      );
      const action = { type: actions.GRAPH_SCHEMA_STOP_DRAG };
      const next = reduceState(state, action);

      expect(next).toEqual(initialState);
    });
  });

  describe('when GRAPH_SCHEMA_UPDATE_ELEMENT_POSITIONS', () => {
    it('updates indicator to update length of class links', () => {
      const action = { type: actions.GRAPH_SCHEMA_UPDATE_ELEMENT_POSITIONS };
      const next = reduceState(initialState, action);

      const expected = initialState.set('shouldUpdateClassLinkLengths', true);
      expect(next).toEqual(expected);
    });
  });

  describe('when GRAPH_SCHEMA_UPDATE_CLASS_POSITION', () => {
    let next;
    beforeEach(() => {
      const state = initialState.setIn(
        ['drag', 'class'],
        Map({
          name: 'Person',
          fromX: 10,
          fromY: 20
        })
      );
      const action = {
        type: actions.GRAPH_SCHEMA_UPDATE_CLASS_POSITION,
        dx: 1,
        dy: -2
      };
      next = reduceState(state, action);
    });

    it('increments class position', () => {
      expect(next.getIn(['drag', 'class', 'fromX'])).toEqual(11);
      expect(next.getIn(['drag', 'class', 'fromY'])).toEqual(18);
    });

    it('updates indicator to update length of class links', () => {
      expect(next.get('shouldUpdateClassLinkLengths')).toEqual(true);
    });
  });

  describe('when GRAPH_SCHEMA_UPDATE_CLASS_LINK_POSITION', () => {
    let next;
    beforeEach(() => {
      const state = initialState.setIn(
        ['drag', 'classLink'],
        Map({
          name: 'has',
          source: 'Person',
          target: 'Car',
          fromX: 10,
          fromY: 20
        })
      );
      const action = {
        type: actions.GRAPH_SCHEMA_UPDATE_CLASS_LINK_POSITION,
        dx: 1,
        dy: 0
      };
      next = reduceState(state, action);
    });

    it('updates class link position', () => {
      expect(next.getIn(['drag', 'classLink', 'fromX'])).toEqual(11);
      expect(next.getIn(['drag', 'classLink', 'fromY'])).toEqual(20);
    });

    it('updates indicator to update length of class links', () => {
      expect(next.get('shouldUpdateClassLinkLengths')).toEqual(true);
    });
  });

  describe('when GRAPH_SCHEMA_UPDATE_PAN', () => {
    let next;
    beforeEach(() => {
      const state = initialState.set('pan', Map({ x: 100, y: 200 })).setIn(
        ['drag', 'pan'],
        Map({
          fromX: 10,
          fromY: 20
        })
      );
      const action = {
        type: actions.GRAPH_SCHEMA_UPDATE_PAN,
        dx: 1,
        dy: 2
      };
      next = reduceState(state, action);
    });

    it('updates pan position', () => {
      expect(next.getIn(['drag', 'pan', 'fromX'])).toEqual(11);
      expect(next.getIn(['drag', 'pan', 'fromY'])).toEqual(22);
      expect(next.getIn(['pan', 'x'])).toEqual(101);
      expect(next.getIn(['pan', 'y'])).toEqual(202);
    });
  });

  describe('when GRAPH_SCHEMA_UPDATE_CLASS_LINK_LENGTHS', () => {
    it('resets indicator of updating length of class links', () => {
      const state = initialState.set('shouldUpdateClassLinkLengths', true);
      const action = { type: actions.GRAPH_SCHEMA_UPDATE_CLASS_LINK_LENGTHS };
      const next = reduceState(state, action);

      const expected = state.set('shouldUpdateClassLinkLengths', false);
      expect(next).toEqual(expected);
    });
  });

  describe('when GRAPH_SCHEMA_SET_DIMENSIONS_AND_COORDINATES', () => {
    it('sets dimensions and coordinates', () => {
      const action = {
        type: actions.GRAPH_SCHEMA_SET_DIMENSIONS_AND_COORDINATES,
        dimensions: [1000, 2000],
        coordinates: [100, 200]
      };
      const next = reduceState(initialState, action);
      const expected = initialState
        .set('dimensions', List([1000, 2000]))
        .set('coordinates', List([100, 200]));

      expect(next).toEqual(expected);
    });
  });

  describe('when GRAPH_SCHEMA_ZOOM', () => {
    it('calculates new zoom level and pan position', () => {
      const state = initialState
        .setIn(['pan', 'x'], 100)
        .setIn(['pan', 'y'], 200);

      const action = {
        type: actions.GRAPH_SCHEMA_ZOOM,
        offset: 1,
        w: 1000,
        h: 800
      };

      const next = reduceState(state, action);

      expect(next.getIn(['pan', 'x'])).toBeCloseTo(80.39);
      expect(next.getIn(['pan', 'y'])).toBeCloseTo(184.31);
      expect(next.get('zoom')).toBeCloseTo(1.02);
    });
  });

  describe('when other actions are dispatched', () => {
    it('does not change state', () => {
      const action = {
        type: 'some other action'
      };

      const next = reduceState(initialState, action);
      expect(next).toEqual(initialState);
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
