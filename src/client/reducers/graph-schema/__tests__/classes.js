const {Map, is, fromJS} = require('immutable');
const reduceClassesState = require('../classes');
const actions = require('../../../actions');
const {createClass} = require('../../../graph-schema');

describe('reducer classes', () => {
  let initialState;

  beforeEach(() => {
    initialState = Map();
  });

  describe('when LOAD_GRAPH_SCHEMA_ELEMENTS', () => {
    test('forgets previous state', () => {
      const state = initialState.set('Dog', fromJS(createClass('Dog')));

      const action = {
        type: actions.LOAD_GRAPH_SCHEMA_ELEMENTS,
        classes: [
          createClass('Person', {name: 'string', age: 'integer'}),
          createClass('Package', {id: 'string'}, 10, 20, undefined, 200),
        ],
      };

      const next = reduceClassesState(state, action);

      const expected = Map(action.classes.map((c) => {
        return [
          c.name,
          fromJS(c),
        ];
      }));

      expect(is(next, expected)).toBe(true);
    });
  });

  describe('when UPDATE_GRAPH_SCHEMA_ELEMENT_POSITIONS', () => {
    test('updates only class positions', () => {
      const state = initialState
        .set('Person', fromJS(createClass('Person', {name: 'string', age: 'integer'})))
        .set('Package', fromJS(createClass('Package', {id: 'string'}, 10, 20, undefined, 200)));

      const action = {
        type: actions.UPDATE_GRAPH_SCHEMA_ELEMENT_POSITIONS,
        classes: [
          createClass('Person', {address: 'string'}, 30, 55),
          createClass('Package', null, 0, 1, false, 0),
        ],
      };

      const next = reduceClassesState(state, action);

      const expected = state
        .setIn(['Person', 'x'], 30)
        .setIn(['Person', 'y'], 55)
        .setIn(['Package', 'x'], 0)
        .setIn(['Package', 'y'], 1);

      expect(is(next, expected)).toBe(true);
    });

    test('will not update any class position with unmatched class name', () => {
      const state = initialState
        .set('Person', fromJS(createClass('Person', {name: 'string', age: 'integer'})))
        .set('Package', fromJS(createClass('Package', {id: 'string'}, 10, 20, undefined, 200)));

      const action = {
        type: actions.UPDATE_GRAPH_SCHEMA_ELEMENT_POSITIONS,
        classes: [
          createClass('Dog', {address: 'string'}, 30, 55),
          createClass('Package', null, 0, 1, false, 0),
        ],
      };

      const next = reduceClassesState(state, action);

      expect(is(next, state)).toBe(true);
    });
  });

  describe('when UPDATE_GRAPH_SCHEMA_CLASS_POSITION', () => {
    test('updates only position of one class', () => {
      const state = initialState
        .set('Person', fromJS(createClass('Person', {name: 'string', age: 'integer'})))
        .set('Package', fromJS(createClass('Package', {id: 'string'}, 10, 20, undefined, 200)));

      const action = {
        type: actions.UPDATE_GRAPH_SCHEMA_CLASS_POSITION,
        name: 'Package',
        dx: 1,
        dy: 2,
      };

      const next = reduceClassesState(state, action);

      const expected = state
        .setIn(['Package', 'x'], 11)
        .setIn(['Package', 'y'], 22);

      expect(is(next, expected)).toBe(true);
    });
  });

  describe('when REVEAL_GRAPH_SCHEMA_CLASS_PROP_TOOLTIP', () => {
    test('sets tooltip-visible property', () => {
      const state = initialState
        .set('Person', fromJS(createClass('Person', {name: 'string', age: 'integer'})));

      const action = {
        type: actions.REVEAL_GRAPH_SCHEMA_CLASS_PROP_TOOLTIP,
        className: 'Person',
        propName: 'age',
      };

      const next = reduceClassesState(state, action);

      const expected = state.setIn(['Person', 'tooltipVisibleProp'], 'age');

      expect(is(next, expected)).toBe(true);
    });
  });

  describe('when HIDE_GRAPH_SCHEMA_CLASS_PROP_TOOLTIP', () => {
    test('resets tooltip visibility of matching property', () => {
      const state = initialState
        .set(
          'Person',
          fromJS(createClass('Person', {name: 'string'}, undefined, undefined, 'name'))
        )
        .set('Package', fromJS(createClass('Package', {id: 'string'}, 10, 20, 'id', 200)));

      const ineffectiveAction = {
        type: actions.HIDE_GRAPH_SCHEMA_CLASS_PROP_TOOLTIP,
        className: 'Person',
        propName: 'age',
      };

      const effectiveAction = {
        type: actions.HIDE_GRAPH_SCHEMA_CLASS_PROP_TOOLTIP,
        className: 'Package',
        propName: 'id',
      };

      const first = reduceClassesState(state, ineffectiveAction);
      const second = reduceClassesState(first, effectiveAction);

      const expectedSecond = state.setIn(['Package', 'tooltipVisibleProp'], null);

      expect(is(first, state)).toBe(true);
      expect(is(second, expectedSecond)).toBe(true);
    });
  });

  describe('when UPDATE_GRAPH_SCHEMA_CLASS_OUTER_RADIUS', () => {
    test('sets outer radius of class', () => {
      const state = initialState
        .set('Person', fromJS(createClass('Person')))
        .set('Package', fromJS(createClass('Package')));

      const action = {
        type: actions.UPDATE_GRAPH_SCHEMA_CLASS_OUTER_RADIUS,
        className: 'Person',
        outerRadius: 1000,
      };

      const next = reduceClassesState(state, action);

      const expected = state.setIn(['Person', 'outerRadius'], 1000);

      expect(is(next, expected)).toBe(true);
    });
  });
});
