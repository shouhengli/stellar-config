import { Map, fromJS } from 'immutable';
import {
  reduceClasses,
  reduceClassPositions,
  reduceSelectedClassIndex
} from '../graph-schema-classes';
import actions from '../../../../actions';
import { reduceClassLinkPositions } from '../graph-schema-class-links';

describe('reducer ui/classes', () => {
  describe('#reduceClasses', () => {
    let state, initialState;

    beforeEach(() => {
      initialState = Map();
      state = initialState
        .set(
          '1',
          fromJS({
            globalIndex: '1',
            name: 'Person',
            props: {
              10: {
                name: 'string',
                age: 'integer',
                globalIndex: '10'
              }
            }
          })
        )
        .set(
          '2',
          fromJS({
            globalIndex: '2',
            name: 'Package',
            props: {
              11: {
                globalIndex: '11'
              }
            }
          })
        );
    });

    describe('when GRAPH_SCHEMA_UPDATE_CONTENT', () => {
      it('updates state with data provided in action', () => {
        const action = {
          type: actions.GRAPH_SCHEMA_UPDATE_CONTENT,
          classes: jest.fn()
        };

        const next = reduceClasses(state, action);

        expect(next).toEqual(action.classes);
      });
    });

    describe('when CLASS_LIST_ADD_NEW_CLASS', () => {
      it('adds the provided new class to list', () => {
        const action = {
          type: actions.CLASS_LIST_ADD_NEW_CLASS,
          newClass: Map({
            globalIndex: 101
          })
        };
        const next = reduceClasses(state, action);
        const expected = state.set(
          action.newClass.get('globalIndex'),
          action.newClass
        );

        expect(next).toEqual(expected);
      });
    });

    describe('when CLASS_EDITOR_SAVE_EDIT', () => {
      it("resets classes' editing status", () => {
        const action = {
          type: actions.CLASS_EDITOR_SAVE_EDIT
        };
        const next = reduceClasses(
          state
            .setIn(['1', 'isEditingName'], true)
            .setIn(['1', 'props', '10', 'isEditing'], true),
          action
        );
        const expected = state
          .setIn(['1', 'isEditingName'], false)
          .setIn(['1', 'props', '10', 'isEditing'], false)
          .setIn(['2', 'isEditingName'], false)
          .setIn(['2', 'props', '11', 'isEditing'], false);

        expect(next).toEqual(expected);
      });
    });

    describe('when CLASS_EDITOR_EDIT_CLASS_NAME', () => {
      it('updates class name editing status', () => {
        const action = {
          type: actions.CLASS_EDITOR_EDIT_CLASS_NAME,
          selectedClass: Map({ globalIndex: '1' })
        };
        const next = reduceClasses(state, action);
        const expected = state.setIn(
          [action.selectedClass.get('globalIndex'), 'isEditingName'],
          true
        );

        expect(next).toEqual(expected);
      });
    });

    describe('when CLASS_EDITOR_EDIT_ATTRIBUTE', () => {
      it('updates class attribute editing status', () => {
        const action = {
          type: actions.CLASS_EDITOR_EDIT_ATTRIBUTE,
          selectedClass: Map({ globalIndex: '1' }),
          attribute: Map({ globalIndex: '10' })
        };
        const next = reduceClasses(state, action);
        const expected = state.setIn(
          [
            action.selectedClass.get('globalIndex'),
            'props',
            action.attribute.get('globalIndex'),
            'isEditing'
          ],
          true
        );
        expect(next).toEqual(expected);
      });
    });

    describe('when CLASS_EDITOR_ADD_NEW_ATTRIBUTE', () => {
      it('adds a new attribute to class', () => {
        const action = {
          type: actions.CLASS_EDITOR_ADD_NEW_ATTRIBUTE,
          selectedClass: Map({ globalIndex: '1' })
        };
        const next = reduceClasses(state, action);
        const expected = state.setIn(
          [action.selectedClass.get('globalIndex'), 'props', '0'],
          Map({ name: '', type: 'string', globalIndex: '0', isEditing: true })
        );
        expect(next).toEqual(expected);
      });
    });

    describe('when CLASS_EDITOR_UPDATE_CLASS_NAME', () => {
      it('updates class name', () => {
        const action = {
          type: actions.CLASS_EDITOR_UPDATE_CLASS_NAME,
          selectedClass: Map({ globalIndex: '1' }),
          name: 'newName'
        };
        const next = reduceClasses(state, action);
        const expected = state.setIn(
          [action.selectedClass.get('globalIndex'), 'name'],
          'newName'
        );
        expect(next).toEqual(expected);
      });
    });

    describe('when CLASS_EDITOR_UPDATE_ATTRIBUTE_NAME', () => {
      it('updates attribute name', () => {
        const action = {
          type: actions.CLASS_EDITOR_UPDATE_ATTRIBUTE_NAME,
          selectedClass: Map({ globalIndex: '1' }),
          attribute: Map({ globalIndex: '10' }),
          newName: 'newName'
        };
        const next = reduceClasses(state, action);
        const expected = state.setIn(
          [action.selectedClass.get('globalIndex'), 'props', '10', 'name'],
          'newName'
        );
        expect(next).toEqual(expected);
      });
    });

    describe('when CLASS_EDITOR_UPDATE_ATTRIBUTE_TYPE', () => {
      it('updates attribute type', () => {
        const action = {
          type: actions.CLASS_EDITOR_UPDATE_ATTRIBUTE_TYPE,
          selectedClass: Map({ globalIndex: '1' }),
          attribute: Map({ globalIndex: '10' }),
          attrType: 'number'
        };
        const next = reduceClasses(state, action);
        const expected = state.setIn(
          [action.selectedClass.get('globalIndex'), 'props', '10', 'type'],
          'number'
        );
        expect(next).toEqual(expected);
      });
    });

    describe('when CLASS_EDITOR_DELETE_ATTRIBUTE', () => {
      it('marks attribute as deleted', () => {
        const action = {
          type: actions.CLASS_EDITOR_DELETE_ATTRIBUTE,
          selectedClass: Map({ globalIndex: '1' }),
          attribute: Map({ globalIndex: '10' })
        };
        const next = reduceClasses(state, action);
        const expected = state.setIn(
          [action.selectedClass.get('globalIndex'), 'props', '10', 'isDeleted'],
          true
        );
        expect(next).toEqual(expected);
      });
    });

    describe('when other actions', () => {
      it('leaves state untouched', () => {
        const action = { type: 'some action' };
        const next = reduceClasses(state, action);
        expect(next).toEqual(state);
      });
    });

    describe('when no state given', () => {
      it('fallbacks to initial state', () => {
        const action = { type: 'some action' };
        const next = reduceClasses(undefined, action);
        expect(next).toEqual(initialState);
      });
    });
  });

  describe('#reduceClassPositions', () => {
    let state, initialState;

    beforeEach(() => {
      initialState = Map();
      state = initialState
        .set(
          '1',
          fromJS({
            globalIndex: '1',
            x: 0,
            y: 0,
            tooltipVisibleProp: 'abc',
            outerRadius: 110
          })
        )
        .set(
          '2',
          fromJS({
            globalIndex: '2',
            x: 1,
            y: 2,
            tooltipVisibleProp: null,
            outerRadius: 10
          })
        );
    });

    describe('when GRAPH_SCHEMA_UPDATE_ELEMENT_POSITIONS', () => {
      it('updates state with provided data', () => {
        const action = {
          type: actions.GRAPH_SCHEMA_UPDATE_ELEMENT_POSITIONS,
          classes: jest.fn()
        };
        const next = reduceClassPositions(state, action);
        expect(next).toEqual(action.classes);
      });
    });

    describe('when GRAPH_SCHEMA_UPDATE_CLASS_POSITION', () => {
      it('updates only position of matched class', () => {
        const action = {
          type: actions.GRAPH_SCHEMA_UPDATE_CLASS_POSITION,
          globalIndex: '1',
          dx: 1,
          dy: 2
        };
        const next = reduceClassPositions(state, action);
        const expected = state.setIn(['1', 'x'], 1).setIn(['1', 'y'], 2);

        expect(next).toEqual(expected);
      });

      it('leave classes untouched when no matches found', () => {
        const action = {
          type: actions.GRAPH_SCHEMA_UPDATE_CLASS_POSITION,
          globalIndex: '100',
          dx: 1,
          dy: 2
        };
        const next = reduceClassPositions(state, action);
        expect(next).toEqual(state);
      });
    });

    describe('when GRAPH_SCHEMA_REVEAL_CLASS_PROP_TOOLTIP', () => {
      it('sets matching tooltip-visible property', () => {
        const action = {
          type: actions.GRAPH_SCHEMA_REVEAL_CLASS_PROP_TOOLTIP,
          globalIndex: '1',
          propName: 'age'
        };
        const next = reduceClassPositions(state, action);
        const expected = state.setIn(
          ['1', 'tooltipVisibleProp'],
          action.propName
        );
        expect(next).toEqual(expected);
      });
    });

    describe('when GRAPH_SCHEMA_HIDE_CLASS_PROP_TOOLTIP', () => {
      it('resets tooltip of matching class property', () => {
        const action = {
          type: actions.GRAPH_SCHEMA_HIDE_CLASS_PROP_TOOLTIP,
          globalIndex: '1',
          propName: 'abc'
        };
        const next = reduceClassPositions(state, action);
        const expected = state.setIn(['1', 'tooltipVisibleProp'], null);
        expect(next).toEqual(expected);
      });

      it('leaves unmatching tooltip untouched', () => {
        const action = {
          type: actions.GRAPH_SCHEMA_HIDE_CLASS_PROP_TOOLTIP,
          globalIndex: '1',
          propName: 'tiger'
        };
        const next = reduceClassPositions(state, action);
        expect(next).toEqual(state);
      });
    });

    describe('when GRAPH_SCHEMA_UPDATE_CLASS_OUTER_RADIUS', () => {
      it('updates outer radius of matching class', () => {
        const action = {
          type: actions.GRAPH_SCHEMA_UPDATE_CLASS_OUTER_RADIUS,
          globalIndex: '1',
          outerRadius: 1000
        };
        const next = reduceClassPositions(state, action);
        const expected = state.setIn(['1', 'outerRadius'], 1000);
        expect(next).toEqual(expected);
      });
    });

    describe('when other actions', () => {
      it('leaves state untouched', () => {
        const action = { type: 'some action' };
        const next = reduceClassPositions(state, action);
        expect(next).toEqual(state);
      });
    });

    describe('when no state given', () => {
      it('fallbacks to initial state', () => {
        const action = { type: 'some action' };
        const next = reduceClassLinkPositions(undefined, action);
        let initialState = Map();
        expect(next).toEqual(initialState);
      });
    });
  });
});

describe('#reduceSelectedClassIndex', () => {
  let state;
  beforeEach(() => {
    state = '100';
  });

  describe('when CLASS_LIST_CLASS_SELECTED', () => {
    it('updates seleced class index', () => {
      const action = {
        type: actions.CLASS_LIST_CLASS_SELECTED,
        selectedClass: Map({ globalIndex: '3' })
      };
      const next = reduceSelectedClassIndex(state, action);
      expect(next).toEqual('3');
    });
  });

  describe('when CLASS_EDITOR_CLOSE_EDIT', () => {
    it('resets seleced class index', () => {
      const action = {
        type: actions.CLASS_EDITOR_CLOSE_EDIT
      };
      const next = reduceSelectedClassIndex(state, action);
      expect(next).toEqual(null);
    });
  });

  describe('when other actions', () => {
    it('leaves state untouched', () => {
      const action = { type: 'some action' };
      const next = reduceSelectedClassIndex(state, action);
      expect(next).toEqual(state);
    });
  });

  describe('when no state given', () => {
    it('fallbacks to initial state', () => {
      const action = { type: 'some action' };
      const next = reduceSelectedClassIndex(undefined, action);
      let initialState = null;
      expect(next).toEqual(initialState);
    });
  });
});
