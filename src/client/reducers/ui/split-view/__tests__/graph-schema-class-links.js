import { Map, fromJS } from 'immutable';
import {
  reduceClassLinks,
  reduceClassLinkPositions
} from '../graph-schema-class-links';
import actions from '../../../../actions';

describe('reducer ui/class-links', () => {
  let initialState;

  beforeEach(() => {
    initialState = Map();
  });
  describe('#reduceClassLinks', () => {
    describe('when GRAPH_SCHEMA_UPDATE_CONTENT', () => {
      let state;

      beforeEach(() => {
        state = initialState.set(
          1,
          fromJS({ name: 'lives-at', source: 'Person', target: 'Street' })
        );
      });

      it('updates class links with data provided in action', () => {
        const action = {
          type: actions.GRAPH_SCHEMA_UPDATE_CONTENT,
          classLinks: jest.fn()
        };
        const next = reduceClassLinks(state, action);
        expect(next).toEqual(action.classLinks);
      });
    });

    describe('when CLASS_LIST_CLASS_SELECTED', () => {
      let state;
      beforeEach(() => {
        state = initialState
          .set(1, fromJS({ name: 'lives-at', sourceIndex: 2, targetIndex: 3 }))
          .set(4, fromJS({ name: 'lives-at', sourceIndex: 6, targetIndex: 7 }));
      });

      it('staged class links related to selected class', () => {
        const action = {
          type: actions.CLASS_LIST_CLASS_SELECTED,
          selectedClass: fromJS({ globalIndex: 2 })
        };
        const next = reduceClassLinks(state, action);
        expect(next.getIn([1, 'isStaged'])).toEqual(true);
        expect(next.getIn([4, 'isStaged'])).toEqual(false);
      });

      it('leaves state untouched if selectedClass is nil', () => {
        const action = {
          type: actions.CLASS_LIST_CLASS_SELECTED,
          selectedClass: null
        };
        const next = reduceClassLinks(state, action);
        expect(next).toEqual(state);
      });
    });

    describe('when CLASS_EDITOR_UPDATE_CLASS_NAME', () => {
      let state;
      beforeEach(() => {
        state = initialState
          .set(
            1,
            fromJS({
              name: 'lives-at',
              source: 'source2',
              target: 'target3',
              sourceIndex: 2,
              targetIndex: 3
            })
          )
          .set(
            4,
            fromJS({
              name: 'lives-at',
              source: 'source6',
              target: 'target7',
              sourceIndex: 6,
              targetIndex: 7
            })
          );
      });

      it('updates related class name in class links', () => {
        const action = {
          type: actions.CLASS_EDITOR_UPDATE_CLASS_NAME,
          selectedClass: Map().set('globalIndex', 2),
          name: 'newName'
        };
        const next = reduceClassLinks(state, action);
        const expected = state.setIn([1, 'source'], 'newName');
        expect(next).toEqual(expected);
      });
    });

    describe('when CLASS_EDITOR_SAVE_EDIT', () => {
      let state;
      beforeEach(() => {
        state = initialState
          .set(
            1,
            fromJS({
              isEditing: true
            })
          )
          .set(4, fromJS({}));
      });

      it("sets class links's isEditing property to false", () => {
        const action = {
          type: actions.CLASS_EDITOR_SAVE_EDIT
        };
        const next = reduceClassLinks(state, action);
        const expected = state
          .setIn([1, 'isEditing'], false)
          .setIn([4, 'isEditing'], false);
        expect(next).toEqual(expected);
      });
    });

    describe('when CLASS_EDITOR_EDIT_CLASS_LINK', () => {
      let state;
      beforeEach(() => {
        state = initialState
          .set(
            1,
            fromJS({
              isEditing: false
            })
          )
          .set(4, fromJS({}));
      });

      it("sets class links's isEditing property to true", () => {
        const action = {
          type: actions.CLASS_EDITOR_EDIT_CLASS_LINK,
          classLink: Map({ globalIndex: 4 })
        };
        const next = reduceClassLinks(state, action);
        const expected = state
          .setIn([1, 'isEditing'], false)
          .setIn([4, 'isEditing'], true);
        expect(next).toEqual(expected);
      });
    });

    describe('when CLASS_LIST_ADD_NEW_CLASS', () => {
      let state;
      beforeEach(() => {
        state = initialState
          .set(
            1,
            fromJS({
              isStaged: true
            })
          )
          .set(4, fromJS({}));
      });

      it("sets all class links's isStaged property to false", () => {
        const action = {
          type: actions.CLASS_LIST_ADD_NEW_CLASS
        };
        const next = reduceClassLinks(state, action);
        const expected = state
          .setIn([1, 'isStaged'], false)
          .setIn([4, 'isStaged'], false);
        expect(next).toEqual(expected);
      });
    });

    describe('when CLASS_EDITOR_CLOSE_EDIT', () => {
      let state;
      beforeEach(() => {
        state = initialState
          .set(
            1,
            fromJS({
              isStaged: true
            })
          )
          .set(4, fromJS({}));
      });

      it("sets all class links's isStaged property to false", () => {
        const action = {
          type: actions.CLASS_EDITOR_CLOSE_EDIT
        };
        const next = reduceClassLinks(state, action);
        const expected = state
          .setIn([1, 'isStaged'], false)
          .setIn([4, 'isStaged'], false);
        expect(next).toEqual(expected);
      });
    });

    describe('when CLASS_EDITOR_ADD_NEW_LINK', () => {
      it('adds a new class link', () => {
        const state = initialState;
        const action = {
          type: actions.CLASS_EDITOR_ADD_NEW_LINK,
          selectedClass: Map({ name: 'selected class', globalIndex: 1 })
        };
        const next = reduceClassLinks(state, action);
        const expected = state.set(
          '0',
          Map({
            name: '',
            source: action.selectedClass.get('name'),
            sourceIndex: action.selectedClass.get('globalIndex'),
            target: action.selectedClass.get('name'),
            targetIndex: action.selectedClass.get('globalIndex'),
            globalIndex: '0',
            isStaged: true,
            isEditing: true
          })
        );
        expect(next).toEqual(expected);
      });
    });

    describe('when CLASS_EDITOR_DELETE_LINK', () => {
      let state;
      beforeEach(() => {
        state = initialState
          .set(
            1,
            fromJS({
              isStaged: true
            })
          )
          .set(4, fromJS({}));
      });

      it('adds the class link as deleted', () => {
        const action = {
          type: actions.CLASS_EDITOR_DELETE_LINK,
          link: Map({ globalIndex: 1 })
        };
        const next = reduceClassLinks(state, action);
        const expected = state.setIn([1, 'isDeleted'], true);
        expect(next).toEqual(expected);
      });
    });

    describe('when CLASS_EDITOR_UPDATE_LINK_NAME', () => {
      let state;
      beforeEach(() => {
        state = initialState
          .set(
            1,
            fromJS({
              isStaged: true
            })
          )
          .set(4, fromJS({}));
      });

      it("updates class link's name", () => {
        const action = {
          type: actions.CLASS_EDITOR_UPDATE_LINK_NAME,
          link: Map({ globalIndex: 1 }),
          newName: 'newName'
        };
        const next = reduceClassLinks(state, action);
        const expected = state.setIn([1, 'name'], action.newName);
        expect(next).toEqual(expected);
      });
    });

    describe('when CLASS_EDITOR_UPDATE_LINK_SOURCE', () => {
      let state;
      beforeEach(() => {
        state = initialState
          .set(
            1,
            fromJS({
              isStaged: true
            })
          )
          .set(4, fromJS({}));
      });

      it("updates class link's source", () => {
        const action = {
          type: actions.CLASS_EDITOR_UPDATE_LINK_SOURCE,
          link: Map({ globalIndex: 1 }),
          newSource: Map({ name: 'newName', globalIndex: 100 })
        };
        const next = reduceClassLinks(state, action);
        const expected = state
          .setIn([1, 'source'], action.newSource.get('name'))
          .setIn([1, 'sourceIndex'], action.newSource.get('globalIndex'));
        expect(next).toEqual(expected);
      });
    });

    describe('when CLASS_EDITOR_UPDATE_LINK_TARGET', () => {
      let state;
      beforeEach(() => {
        state = initialState
          .set(
            1,
            fromJS({
              isStaged: true
            })
          )
          .set(4, fromJS({}));
      });

      it("updates class link's source", () => {
        const action = {
          type: actions.CLASS_EDITOR_UPDATE_LINK_TARGET,
          link: Map({ globalIndex: 1 }),
          newTarget: Map({ name: 'newName', globalIndex: 100 })
        };
        const next = reduceClassLinks(state, action);
        const expected = state
          .setIn([1, 'target'], action.newTarget.get('name'))
          .setIn([1, 'targetIndex'], action.newTarget.get('globalIndex'));
        expect(next).toEqual(expected);
      });
    });

    describe('when other actions', () => {
      it('leaves state untouched', () => {
        const action = { type: 'some action' };
        const next = reduceClassLinks(initialState, action);
        expect(next).toEqual(initialState);
      });
    });

    describe('when no state given', () => {
      it('fallbacks to initial state', () => {
        const action = { type: 'some action' };
        const next = reduceClassLinks(undefined, action);
        expect(next).toEqual(initialState);
      });
    });
  });

  describe('#reduceClassLinkPositions', () => {
    describe('when GRAPH_SCHEMA_UPDATE_ELEMENT_POSITIONS', () => {
      let state;
      beforeEach(() => {
        state = initialState.set(
          1,
          fromJS({
            name: 'lives-at',
            source: 'Person',
            target: 'Street',
            x: 0,
            y: 0
          })
        );
      });

      it('updates class link positions with data provided in action', () => {
        const action = {
          type: actions.GRAPH_SCHEMA_UPDATE_ELEMENT_POSITIONS,
          classLinks: jest.fn()
        };
        const next = reduceClassLinkPositions(state, action);

        expect(next).toEqual(action.classLinks);
      });
    });

    describe('when GRAPH_SCHEMA_UPDATE_CLASS_LINK_POSITION', () => {
      let state;
      beforeEach(() => {
        state = initialState.set(
          1,
          fromJS({
            name: 'lives-at',
            source: 'Person',
            target: 'Street',
            x: 0,
            y: 0
          })
        );
      });

      it('increments position of matching class links', () => {
        const action = {
          type: actions.GRAPH_SCHEMA_UPDATE_CLASS_LINK_POSITION,
          globalIndex: 1,
          dx: 1,
          dy: -1
        };

        const next = reduceClassLinkPositions(state, action);

        const expected = Map().set(
          1,
          fromJS({
            name: 'lives-at',
            source: 'Person',
            target: 'Street',
            x: 1,
            y: -1
          })
        );
        expect(next).toEqual(expected);
      });

      it('leave unmatching class links untouched', () => {
        const action = {
          type: actions.GRAPH_SCHEMA_UPDATE_CLASS_LINK_POSITION,
          globalIndex: 2,
          dx: 1,
          dy: -1
        };
        const next = reduceClassLinkPositions(state, action);

        expect(next).toEqual(state);
      });
    });

    describe('when GRAPH_SCHEMA_UPDATE_CLASS_LINK_LENGTHS', () => {
      let state;
      beforeEach(() => {
        state = initialState
          .set(
            1,
            fromJS({
              name: 'lives-at',
              source: 'Person',
              target: 'Street',
              length: 1,
              x: 0,
              y: 0
            })
          )
          .set(
            2,
            fromJS({
              name: 'has',
              source: 'Person',
              target: 'Dog',
              x: 100,
              y: 100
            })
          );
      });

      it('updates length of class links', () => {
        const action = {
          type: actions.GRAPH_SCHEMA_UPDATE_CLASS_LINK_LENGTHS,
          classLinks: fromJS([
            { globalIndex: 1, length: 11 },
            { globalIndex: 2, length: 22 }
          ])
        };
        const next = reduceClassLinkPositions(state, action);

        const expected = state
          .set(
            1,
            fromJS({
              name: 'lives-at',
              source: 'Person',
              target: 'Street',
              x: 0,
              y: 0,
              length: 11
            })
          )
          .set(
            2,
            fromJS({
              name: 'has',
              source: 'Person',
              target: 'Dog',
              x: 100,
              y: 100,
              length: 22
            })
          );

        expect(next.equals(expected)).toBe(true);
      });

      it('leaves unmatching links untouched', () => {
        const action = {
          type: actions.GRAPH_SCHEMA_UPDATE_CLASS_LINK_LENGTHS,
          classLinks: fromJS([{ globalIndex: 3, length: 11 }])
        };
        const next = reduceClassLinkPositions(state, action);

        expect(next).toEqual(state);
      });
    });

    describe('when other actions', () => {
      it('leaves state untouched', () => {
        const action = { type: 'some action' };
        const next = reduceClassLinkPositions(initialState, action);
        expect(next).toEqual(initialState);
      });
    });

    describe('when no state given', () => {
      it('fallbacks to initial state', () => {
        const action = { type: 'some action' };
        const next = reduceClassLinkPositions(undefined, action);
        expect(next).toEqual(initialState);
      });
    });
  });
});
