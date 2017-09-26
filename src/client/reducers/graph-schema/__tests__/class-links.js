const {Map, is, fromJS} = require('immutable');
const reduceState = require('../class-links');
const actions = require('../../../actions');
const {createClassLink, getClassLinkKey} = require('../../../graph-schema');

describe('reducer class-links', () => {
  let initialState;

  beforeEach(() => {
    initialState = Map();
  });

  describe('when LOAD_GRAPH_SCHEMA_ELEMENTS', () => {
    test('forgets previous state', () => {
      const classLink = createClassLink('has', 'Person', 'Car');
      const state = initialState.set(getClassLinkKey(classLink), fromJS(classLink));

      const action = {
        type: actions.LOAD_GRAPH_SCHEMA_ELEMENTS,
        classLinks: [
          createClassLink('lives-at', 'Person', 'Place'),
          createClassLink('receives', 'Person', 'Package'),
        ],
      };

      const next = reduceState(state, action);

      const expected = Map(
        action.classLinks.map(
          (l) => [
            getClassLinkKey(l),
            fromJS(l),
          ]
        )
      );

      expect(is(next, expected)).toBe(true);
    });
  });

  describe('when UPDATE_GRAPH_SCHEMA_ELEMENT_POSITIONS', () => {
    test('updates only position of class links', () => {
      const classLink1 = createClassLink('has', 'Person', 'Car');
      const classLink2 = createClassLink('lives-at', 'Person', 'Place');

      const state = initialState
        .set(getClassLinkKey(classLink1), fromJS(classLink1))
        .set(getClassLinkKey(classLink2), fromJS(classLink2));

      const action = {
        type: actions.UPDATE_GRAPH_SCHEMA_ELEMENT_POSITIONS,
        classLinks: [
          createClassLink('lives-at', 'Person', 'Place', 10, 100, 1000),
          createClassLink('has', 'Person', 'Car', 9, 99, 999),
        ],
      };

      const next = reduceState(state, action);

      const expected = state
        .setIn([getClassLinkKey(classLink2), 'x'], 10)
        .setIn([getClassLinkKey(classLink2), 'y'], 100)
        .setIn([getClassLinkKey(classLink1), 'x'], 9)
        .setIn([getClassLinkKey(classLink1), 'y'], 99);

      expect(is(next, expected)).toBe(true);
    });

    test('will not update any class link if any matched key is found', () => {
      const classLink1 = createClassLink('has', 'Person', 'Car');
      const classLink2 = createClassLink('lives-at', 'Person', 'Place');

      const state = initialState
        .set(getClassLinkKey(classLink1), fromJS(classLink1))
        .set(getClassLinkKey(classLink2), fromJS(classLink2));

      const action = {
        type: actions.UPDATE_GRAPH_SCHEMA_ELEMENT_POSITIONS,
        classLinks: [
          createClassLink('rents-at', 'Person', 'Place', 10, 100, 1000),
          createClassLink('has', 'Person', 'Car', 9, 99, 999),
        ],
      };

      const next = reduceState(state, action);

      expect(is(next, state)).toBe(true);
    });
  });

  describe('when UPDATE_GRAPH_SCHEMA_CLASS_LINK_POSITION', () => {
    test('updates only position of matched class', () => {
      const classLink1 = createClassLink('has', 'Person', 'Car', 10, 20);
      const classLink2 = createClassLink('lives-at', 'Person', 'Place');

      const state = initialState
        .set(getClassLinkKey(classLink1), fromJS(classLink1))
        .set(getClassLinkKey(classLink2), fromJS(classLink2));

      const action = {
        type: actions.UPDATE_GRAPH_SCHEMA_CLASS_LINK_POSITION,
        name: 'has',
        source: 'Person',
        target: 'Car',
        dx: 1,
        dy: 2,
      };

      const next = reduceState(state, action);

      const expected = state
        .setIn([getClassLinkKey(classLink1), 'x'], 11)
        .setIn([getClassLinkKey(classLink1), 'y'], 22);

      expect(is(next, expected)).toBe(true);
    });
  });

  describe('when UPDATE_GRAPH_SCHEMA_CLASS_LINK_LENGTHS', () => {
    test('updates only length of class links', () => {
      const classLink1 = createClassLink('has', 'Person', 'Car');
      const classLink2 = createClassLink('lives-at', 'Person', 'Place');

      const state = initialState
        .set(getClassLinkKey(classLink1), fromJS(classLink1))
        .set(getClassLinkKey(classLink2), fromJS(classLink2));

      const action = {
        type: actions.UPDATE_GRAPH_SCHEMA_CLASS_LINK_LENGTHS,
        classLinks: [
          createClassLink('lives-at', 'Person', 'Place', 10, 100, 1000),
          createClassLink('has', 'Person', 'Car', 9, 99, 999),
        ],
      };

      const next = reduceState(state, action);

      const expected = state
        .setIn([getClassLinkKey(classLink2), 'length'], 1000)
        .setIn([getClassLinkKey(classLink1), 'length'], 999);

      expect(is(next, expected)).toBe(true);
    });
  });
});
