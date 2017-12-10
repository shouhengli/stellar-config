import R from 'ramda';
import { fromJS, Map } from 'immutable';
import actions from '../../actions';
import utils from '../../util';

const initialState = Map();

export default function reduce(state = initialState, action) {
  switch (action.type) {
    case actions.GRAPH_SCHEMA_UPDATE_CONTENT:
      return R.reduce(
        (s, c) => s.set(c.name, fromJS(c)),
        Map(),
        utils.defaultToEmptyList(action.classes)
      );

    case actions.GRAPH_SCHEMA_UPDATE_ELEMENT_POSITIONS:
      if (R.any(c => state.has(c.name), action.classes)) {
        return R.reduce(
          (s, c) => s.setIn([c.name, 'x'], c.x).setIn([c.name, 'y'], c.y),
          state,
          action.classes
        );
      } else {
        return state;
      }

    case actions.GRAPH_SCHEMA_UPDATE_CLASS_POSITION:
      if (state.has(action.name)) {
        return state
          .setIn(
            [action.name, 'x'],
            state.getIn([action.name, 'x']) + action.dx
          )
          .setIn(
            [action.name, 'y'],
            state.getIn([action.name, 'y']) + action.dy
          );
      } else {
        return state;
      }

    case actions.GRAPH_SCHEMA_REVEAL_CLASS_PROP_TOOLTIP:
      return state.setIn(
        [action.className, 'tooltipVisibleProp'],
        action.propName
      );

    case actions.GRAPH_SCHEMA_HIDE_CLASS_PROP_TOOLTIP:
      return R.identical(
        state.getIn([action.className, 'tooltipVisibleProp']),
        action.propName
      )
        ? state.setIn([action.className, 'tooltipVisibleProp'], null)
        : state;

    case actions.GRAPH_SCHEMA_UPDATE_CLASS_OUTER_RADIUS:
      return state.setIn([action.className, 'outerRadius'], action.outerRadius);
    default:
      return state;
  }
}
