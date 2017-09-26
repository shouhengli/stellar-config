const R = require('ramda');
const {fromJS, Map} = require('immutable');
const actions = require('../../actions');

const initialClassesState = Map();

function reduceClassesState(state = initialClassesState, action) {
  switch (action.type) {
    case actions.LOAD_GRAPH_SCHEMA_ELEMENTS:
      return R.reduce(
        (s, c) => s.set(c.name, fromJS(c)),
        Map(),
        action.classes
      );

    case actions.UPDATE_GRAPH_SCHEMA_ELEMENT_POSITIONS:
      if (R.any((c) => !state.has(c.name), action.classes)) {
        return state;
      } else {
        return R.reduce(
          (s, c) => s
            .setIn([c.name, 'x'], c.x)
            .setIn([c.name, 'y'], c.y),
          state,
          action.classes
        );
      }

    case actions.UPDATE_GRAPH_SCHEMA_CLASS_POSITION:
      return state
        .setIn(
          [action.name, 'x'],
          state.getIn([action.name, 'x']) + action.dx
        )
        .setIn(
          [action.name, 'y'],
          state.getIn([action.name, 'y']) + action.dy
        );

    case actions.REVEAL_GRAPH_SCHEMA_CLASS_PROP_TOOLTIP:
      return state.setIn([action.className, 'tooltipVisibleProp'], action.propName);

    case actions.HIDE_GRAPH_SCHEMA_CLASS_PROP_TOOLTIP:
      return state.getIn([action.className, 'tooltipVisibleProp']) === action.propName
           ? state.setIn([action.className, 'tooltipVisibleProp'], null)
           : state;

    case actions.UPDATE_GRAPH_SCHEMA_CLASS_OUTER_RADIUS:
      return state.setIn([action.className, 'outerRadius'], action.outerRadius);

    default:
      return state;
  }
}

module.exports = reduceClassesState;
