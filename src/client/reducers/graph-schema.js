const R = require('ramda');
const {fromJS, Map} = require('immutable');
const actions = require('../actions');

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
      return R.reduce(
        (s, c) => s.setIn([c.name, 'x'], c.x).setIn([c.name, 'y'], c.y),
        state,
        action.classes
      );

    case actions.UPDATE_GRAPH_SCHEMA_CLASS_POSITION:
      return state.setIn([action.name, 'x'], action.x);

    case actions.REVEAL_GRAPH_SCHEMA_CLASS_PROP_TOOLTIP:
      return state.setIn([action.className, 'tooltipVisibleProp'], action.propName);

    case actions.HIDE_GRAPH_SCHEMA_CLASS_PROP_TOOLTIP:
      return state.getIn([action.className, 'tooltipVisibleProp']) === action.propName
           ? state.setIn([action.className, 'tooltipVisibleProp'], null)
           : state;

    default:
      return state;
  }
}

const initialClassLinksState = Map();

function reduceClassLinksState(state = initialClassLinksState, action) {
  switch (action.type) {
    case actions.LOAD_GRAPH_SCHEMA_ELEMENTS:
      return R.reduce(
        (s, l) => s.setIn([l.source, l.target, l.name], fromJS(l)),
        Map(),
        action.classLinks
      );

    case actions.UPDATE_GRAPH_SCHEMA_ELEMENT_POSITIONS:
      return R.reduce(
        (s, l) => s
          .setIn([l.source, l.target, l.name, 'x'], l.x)
          .setIn([l.source, l.target, l.name, 'y'], l.y),
        state,
        action.classLinks
      );

    case actions.UPDATE_GRAPH_SCHEMA_CLASS_LINK_POSITION:
      return state
        .setIn([action.source, action.target, action.name, 'x'], action.x)
        .setIn([action.source, action.target, action.name, 'y'], action.y);

    case actions.UPDATE_GRAPH_SCHEMA_CLASS_LINK_LENGTH:
      return state.setIn(
        [action.source, action.target, action.name, 'length'],
        action.length
      );

    default:
      return state;
  }
}

const initialDragState = Map({
  'class': {},
  'classLink': {},
});

function reduceDragState(state = initialDragState, action) {
  switch (action.type) {
    case actions.START_GRAPH_SCHEMA_CLASS_DRAG:
      return state.setIn(
        ['class', action.name],
        Map({
          fromX: action.fromX,
          fromY: action.fromY,
        })
      );

    case actions.STOP_GRAPH_SCHEMA_CLASS_DRAG:
      return state.deleteIn(['class', action.name]);

    case actions.START_GRAPH_SCHEMA_CLASS_LINK_DRAG:
      return state.setIn(
        ['classLink', action.source, action.target, action.name],
        Map({
          fromX: action.fromX,
          fromY: action.fromY,
        })
      );

    case actions.STOP_GRAPH_SCHEMA_CLASS_LINK_DRAG:
      return state.deleteIn([
        'classLink',
        action.source,
        action.target,
        action.name,
      ]);

    default:
      return state;
  }
}

const {combineReducers} = require('redux-immutable');

module.exports = combineReducers({
  classes: reduceClassesState,
  classLinks: reduceClassLinksState,
  drag: reduceDragState,
});
