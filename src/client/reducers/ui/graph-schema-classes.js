const R = require('ramda');
const {fromJS, Map} = require('immutable');
const actions = require('../../actions');

const initialState = Map();

function reduce(state = initialState, action) {
  switch (action.type) {
    case actions.GRAPH_SCHEMA_LOAD_ELEMENTS:
      return R.reduce(
        (s, c) => s.set(c.name, fromJS(c)),
        Map(),
        action.classes
      );

    case actions.GRAPH_SCHEMA_UPDATE_ELEMENT_POSITIONS:
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

    case actions.GRAPH_SCHEMA_UPDATE_CLASS_POSITION:
      return state
        .setIn(
          [action.name, 'x'],
          state.getIn([action.name, 'x']) + action.dx
        )
        .setIn(
          [action.name, 'y'],
          state.getIn([action.name, 'y']) + action.dy
        );

    case actions.GRAPH_SCHEMA_REVEAL_CLASS_PROP_TOOLTIP:
      return state.setIn([action.className, 'tooltipVisibleProp'], action.propName);

    case actions.GRAPH_SCHEMA_HIDE_CLASS_PROP_TOOLTIP:
      return (
        R.identical(
          state.getIn([action.className, 'tooltipVisibleProp']),
          action.propName
        )
        ? state.setIn([action.className, 'tooltipVisibleProp'], null)
        : state
      );

    case actions.GRAPH_SCHEMA_UPDATE_CLASS_OUTER_RADIUS:
      return state.setIn([action.className, 'outerRadius'], action.outerRadius);

    default:
      return state;
  }
}

module.exports = reduce;
