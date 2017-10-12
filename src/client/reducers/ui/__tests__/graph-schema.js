const {Map, is, fromJS, List} = require('immutable');
const reduceState = require('../graph-schema');
const actions = require('../../../actions');

describe('reducer ui/graph-schema', () => {
  let initialState;

  beforeEach(() => {
    initialState = fromJS({
      drag: {},
      shouldUpdateClassLinkLengths: false,
      dimensions: [0, 0],
      pan: {
        x: 0,
        y: 0,
      },
      zoom: 1,
    });
  });

  describe('when GRAPH_SCHEMA_LOAD_ELEMENTS', () => {
    test('resets some state fields', () => {
      const state = initialState
        .set('shouldUpdateClassLinkLengths', true)
        .set('pan', Map({x: 100, y: 200}))
        .set('zoom', 2);

      const action = {type: actions.GRAPH_SCHEMA_LOAD_ELEMENTS};

      const next = reduceState(state, action);

      expect(is(next, initialState)).toBe(true);
    });
  });

  describe('when GRAPH_SCHEMA_START_CLASS_DRAG', () => {
    test('remembers the class being dragged', () => {
      const action = {
        type: actions.GRAPH_SCHEMA_START_CLASS_DRAG,
        name: 'Person',
        fromX: 100,
        fromY: 200,
      };

      const next = reduceState(initialState, action);

      const expected = initialState.setIn(
        ['drag', 'class'],
        Map({
          name: action.name,
          fromX: action.fromX,
          fromY: action.fromY,
        })
      );

      expect(is(next, expected)).toBe(true);
    });
  });

  describe('when GRAPH_SCHEMA_START_CLASS_LINK_DRAG', () => {
    test('remembers the class link being dragged', () => {
      const action = {
        type: actions.GRAPH_SCHEMA_START_CLASS_LINK_DRAG,
        classLink: {
          name: 'has',
          source: 'Person',
          target: 'Car',
        },
        fromX: 100,
        fromY: 200,
      };

      const next = reduceState(initialState, action);

      const expected = initialState.setIn(
        ['drag', 'classLink'],
        Map({
          name: 'has',
          source: 'Person',
          target: 'Car',
          fromX: action.fromX,
          fromY: action.fromY,
        })
      );

      expect(is(next, expected)).toBe(true);
    });
  });

  describe('when GRAPH_SCHEMA_START_PAN', () => {
    test('remembers current position', () => {
      const action = {
        type: actions.GRAPH_SCHEMA_START_PAN,
        fromX: 100,
        fromY: 200,
      };

      const next = reduceState(initialState, action);

      const expected = initialState.setIn(
        ['drag', 'pan'],
        Map({
          fromX: action.fromX,
          fromY: action.fromY,
        })
      );

      expect(is(next, expected)).toBe(true);
    });
  });

  describe('when GRAPH_SCHEMA_STOP_DRAG', () => {
    test('resets drag field', () => {
      const state = initialState.setIn(
        ['drag', 'class'],
        Map({
          name: 'Person',
          fromX: 10,
          fromY: 20,
        })
      );

      const action = {type: actions.GRAPH_SCHEMA_STOP_DRAG};

      const next = reduceState(state, action);

      expect(is(next, initialState)).toBe(true);
    });
  });

  describe('when GRAPH_SCHEMA_UPDATE_ELEMENT_POSITIONS', () => {
    test('gives indicator to update length of class links', () => {
      const action = {type: actions.GRAPH_SCHEMA_UPDATE_ELEMENT_POSITIONS};
      const next = reduceState(initialState, action);

      const expected = initialState.set('shouldUpdateClassLinkLengths', true);
      expect(is(next, expected)).toBe(true);
    });
  });

  describe('when GRAPH_SCHEMA_UPDATE_CLASS_POSITION', () => {
    test('updates class position and gives indicator to update length of class links', () => {
      const state = initialState.setIn(
        ['drag', 'class'],
        Map({
          name: 'Person',
          fromX: 10,
          fromY: 20,
        })
      );

      const action = {
        type: actions.GRAPH_SCHEMA_UPDATE_CLASS_POSITION,
        dx: 1,
        dy: 2,
      };

      const next = reduceState(state, action);

      const expected = state
        .set('shouldUpdateClassLinkLengths', true)
        .setIn(['drag', 'class', 'fromX'], 11)
        .setIn(['drag', 'class', 'fromY'], 22);

      expect(is(next, expected)).toBe(true);
    });
  });

  describe('when GRAPH_SCHEMA_UPDATE_CLASS_LINK_POSITION', () => {
    test('updates class link position and gives indicator to update length of class links', () => {
      const state = initialState.setIn(
        ['drag', 'classLink'],
        Map({
          name: 'has',
          source: 'Person',
          target: 'Car',
          fromX: 10,
          fromY: 20,
        })
      );

      const action = {
        type: actions.GRAPH_SCHEMA_UPDATE_CLASS_LINK_POSITION,
        dx: 1,
        dy: 2,
      };

      const next = reduceState(state, action);

      const expected = state
        .set('shouldUpdateClassLinkLengths', true)
        .setIn(['drag', 'classLink', 'fromX'], 11)
        .setIn(['drag', 'classLink', 'fromY'], 22);

      expect(is(next, expected)).toBe(true);
    });
  });

  describe('when GRAPH_SCHEMA_UPDATE_PAN', () => {
    test('updates pan position', () => {
      const state = initialState
        .set('pan', Map({x: 100, y: 200}))
        .setIn(
          ['drag', 'pan'],
          Map({
            fromX: 10,
            fromY: 20,
          })
        );

      const action = {
        type: actions.GRAPH_SCHEMA_UPDATE_PAN,
        dx: 1,
        dy: 2,
      };

      const next = reduceState(state, action);

      const expected = state
        .set('pan', Map({x: 101, y: 202}))
        .setIn(
          ['drag', 'pan'],
          Map({
            fromX: 11,
            fromY: 22,
          })
        );

      expect(is(next, expected)).toBe(true);
    });
  });

  describe('when GRAPH_SCHEMA_UPDATE_CLASS_LINK_LENGTHS', () => {
    test('resets indicator of updating length of class links', () => {
      const state = initialState.set('shouldUpdateClassLinkLengths', true);
      const action = {type: actions.GRAPH_SCHEMA_UPDATE_CLASS_LINK_LENGTHS};
      const next = reduceState(state, action);

      const expected = state.set('shouldUpdateClassLinkLengths', false);
      expect(is(next, expected)).toBe(true);
    });
  });

  describe('when GRAPH_SCHEMA_SET_DIMENSIONS_AND_COORDINATES', () => {
    test('sets dimensions and coordinates', () => {
      const action = {
        type: actions.GRAPH_SCHEMA_SET_DIMENSIONS_AND_COORDINATES,
        dimensions: [1000, 2000],
        coordinates: [100, 200],
      };

      const next = reduceState(initialState, action);

      const expected = initialState
        .set('dimensions', List([1000, 2000]))
        .set('coordinates', List([100, 200]));

      expect(is(next, expected)).toBe(true);
    });
  });

  describe('when GRAPH_SCHEMA_ZOOM', () => {
    test('calculates new zoom level and pan position', () => {
      const state = initialState
        .setIn(['pan', 'x'], 100)
        .setIn(['pan', 'y'], 200);

      const action = {
        type: actions.GRAPH_SCHEMA_ZOOM,
        offset: 1,
        w: 1000,
        h: 800,
      };

      const next = reduceState(state, action);

      expect(next.getIn(['pan', 'x'])).toBeCloseTo(80.39);
      expect(next.getIn(['pan', 'y'])).toBeCloseTo(184.31);
      expect(next.get('zoom')).toBeCloseTo(1.02);
    });
  });
});
