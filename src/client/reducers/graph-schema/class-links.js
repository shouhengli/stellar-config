const R = require('ramda');
const {fromJS, Map} = require('immutable');
const actions = require('../../actions');
const {getClassLinkKey} = require('../../graph-schema');

const initialState = Map();

function reduce(state = initialState, action) {
  switch (action.type) {
    case actions.GRAPH_SCHEMA_LOAD_ELEMENTS:
      return R.reduce(
        (s, l) => s.set(getClassLinkKey(l), fromJS(l)),
        Map(),
        action.classLinks
      );

    case actions.GRAPH_SCHEMA_UPDATE_ELEMENT_POSITIONS:
      if (R.any((l) => !state.has(getClassLinkKey(l)), action.classLinks)) {
        return state;
      } else {
        return R.reduce(
          (s, l) => s
            .setIn([getClassLinkKey(l), 'x'], l.x)
            .setIn([getClassLinkKey(l), 'y'], l.y),
          state,
          action.classLinks
        );
      }

    case actions.GRAPH_SCHEMA_UPDATE_CLASS_LINK_POSITION: {
      const classLinkKey = getClassLinkKey({
        name: action.name,
        source: action.source,
        target: action.target,
      });

      return state
        .setIn(
          [classLinkKey, 'x'],
          state.getIn([classLinkKey, 'x']) + action.dx
        )
        .setIn(
          [classLinkKey, 'y'],
          state.getIn([classLinkKey, 'y']) + action.dy
        );
    }

    case actions.GRAPH_SCHEMA_UPDATE_CLASS_LINK_LENGTHS:
      return state.withMutations((mutableState) => {
        action.classLinks.forEach((classLink) =>
          mutableState.setIn(
            [getClassLinkKey(classLink), 'length'],
            classLink.length
          )
        );
      });

    default:
      return state;
  }
}

module.exports = reduce;
