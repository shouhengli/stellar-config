import { Map, fromJS } from 'immutable';
import reduceClassesState from '../graph-schema-classes';
import actions from '../../../actions';

describe('reducer classes', () => {
  let state, initialState;

  beforeEach(() => {
    initialState = Map();
    state = initialState
      .set(
        'Person',
        fromJS({
          name: 'Person',
          props: {
            name: 'string',
            age: 'integer'
          }
        })
      )
      .set(
        'Package',
        fromJS({
          name: 'Package',
          props: {
            id: 'string'
          },
          x: 10,
          y: 20,
          tooltipVisibleProp: undefined,
          outerRadius: 200
        })
      );
  });

  describe('when GRAPH_SCHEMA_UPDATE_CONTENT', () => {
    it('updates state with data provided in action', () => {
      const action = {
        type: actions.GRAPH_SCHEMA_UPDATE_CONTENT,
        classes: [
          {
            name: 'Person',
            props: {
              name: 'string',
              age: 'integer',
              tooltipVisibleProp: undefined
            }
          },
          {
            name: 'Package',
            props: { id: 'string', x: 10, y: 20, outerRadius: 200 }
          }
        ]
      };

      const next = reduceClassesState(state, action);

      const expected = Map(
        action.classes.map(c => {
          return [c.name, fromJS(c)];
        })
      );

      expect(next).toEqual(expected);
    });

    it('sets state to empty map when classes are not provided in action', () => {
      const action = {
        type: actions.GRAPH_SCHEMA_UPDATE_CONTENT,
        classes: null
      };

      const next = reduceClassesState(state, action);

      const expected = Map({});

      expect(next).toEqual(expected);
    });
  });

  describe('when GRAPH_SCHEMA_UPDATE_ELEMENT_POSITIONS', () => {
    it('updates only class positions', () => {
      const action = {
        type: actions.GRAPH_SCHEMA_UPDATE_ELEMENT_POSITIONS,
        classes: [
          {
            name: 'Person',
            props: {
              name: 'new string',
              age: 'new integer'
            },
            x: 10,
            y: 20,
            outerRadius: 200
          }
        ]
      };

      const next = reduceClassesState(state, action);

      const expected = state
        .setIn(['Person', 'x'], 10)
        .setIn(['Person', 'y'], 20);

      expect(next.get('Person')).toEqual(expected.get('Person'));
    });

    it('will not update any class if no matches found', () => {
      const action = {
        type: actions.GRAPH_SCHEMA_UPDATE_ELEMENT_POSITIONS,
        classes: [
          {
            Dog: fromJS({
              name: 'Dog',
              props: {
                name: 'Dog'
              },
              x: 30
            })
          }
        ]
      };
      const next = reduceClassesState(state, action);

      expect(next).toEqual(state);
    });
  });

  describe('when GRAPH_SCHEMA_UPDATE_CLASS_POSITION', () => {
    it('updates only position of matched class', () => {
      const action = {
        type: actions.GRAPH_SCHEMA_UPDATE_CLASS_POSITION,
        name: 'Package',
        dx: 1,
        dy: 2
      };

      const next = reduceClassesState(state, action);

      const expected = state
        .setIn(['Package', 'x'], 11)
        .setIn(['Package', 'y'], 22);

      expect(next.get('Package')).toEqual(expected.get('Package'));
    });

    it('leaves unmatching classes untouched', () => {
      const action = {
        type: actions.GRAPH_SCHEMA_UPDATE_CLASS_POSITION,
        name: 'Package',
        dx: 1,
        dy: 2
      };

      const next = reduceClassesState(state, action);

      expect(next.get('Person')).toEqual(state.get('Person'));
    });

    it('leave classes untouched when no matches found', () => {
      const action = {
        type: actions.GRAPH_SCHEMA_UPDATE_CLASS_POSITION,
        name: 'Dog',
        dx: 1,
        dy: 2
      };

      const next = reduceClassesState(state, action);

      expect(next).toEqual(state);
    });
  });

  describe('when GRAPH_SCHEMA_REVEAL_CLASS_PROP_TOOLTIP', () => {
    let next;
    beforeEach(() => {
      const action = {
        type: actions.GRAPH_SCHEMA_REVEAL_CLASS_PROP_TOOLTIP,
        className: 'Person',
        propName: 'age'
      };
      next = reduceClassesState(state, action);
    });
    it('sets matching tooltip-visible property', () => {
      expect(next.getIn(['Person', 'tooltipVisibleProp'])).toEqual('age');
    });

    it('leave unmatching classes untouched', () => {
      expect(next.getIn(['Package', 'tooltipVisibleProp'])).toEqual(undefined);
    });
  });

  describe('when GRAPH_SCHEMA_HIDE_CLASS_PROP_TOOLTIP', () => {
    let next, action;
    beforeEach(() => {
      action = {
        type: actions.GRAPH_SCHEMA_HIDE_CLASS_PROP_TOOLTIP,
        className: 'Person',
        propName: 'age'
      };
    });

    it('only resets tooltip visibility of matching property', () => {
      next = reduceClassesState(
        state.setIn(['Person', 'tooltipVisibleProp'], 'age'),
        action
      );
      const expected = state.setIn(['Person', 'tooltipVisibleProp'], null);
      expect(next).toEqual(expected);
    });

    it('leaves unmatching property untouched', () => {
      state = state.setIn(['Person', 'tooltipVisibleProp'], 'abc');
      next = reduceClassesState(state, action);
      expect(next).toEqual(state);
    });
  });

  describe('when GRAPH_SCHEMA_UPDATE_CLASS_OUTER_RADIUS', () => {
    it('sets only outer radius of matching class', () => {
      const action = {
        type: actions.GRAPH_SCHEMA_UPDATE_CLASS_OUTER_RADIUS,
        className: 'Person',
        outerRadius: 1000
      };

      const next = reduceClassesState(state, action);

      const expected = state.setIn(['Person', 'outerRadius'], 1000);

      expect(next).toEqual(expected);
    });
  });

  describe('when other actions', () => {
    it('leaves state untouched', () => {
      const action = { type: 'some action' };
      const next = reduceClassesState(state, action);
      expect(next).toEqual(state);
    });
  });

  describe('when no state given', () => {
    it('fallbacks to initial state', () => {
      const action = { type: 'some action' };
      const next = reduceClassesState(undefined, action);
      expect(next).toEqual(initialState);
    });
  });
});
