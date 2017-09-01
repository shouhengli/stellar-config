const R = require('ramda');
const {fromJS, List, Map} = require('immutable');
const actions = require('../actions');
const {getClassLinkId} = require('../graph-schema');

const getClassLinkKey = R.compose(List, getClassLinkId);

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
        (s, c) => s
          .setIn([c.name, 'x'], c.x)
          .setIn([c.name, 'y'], c.y),
        state,
        action.classes
      );

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

const initialClassLinksState = Map();

function reduceClassLinksState(state = initialClassLinksState, action) {
  switch (action.type) {
    case actions.LOAD_GRAPH_SCHEMA_ELEMENTS:
      return R.reduce(
        (s, l) => s.set(getClassLinkKey(l), fromJS(l)),
        Map(),
        action.classLinks
      );

    case actions.UPDATE_GRAPH_SCHEMA_ELEMENT_POSITIONS:
      return R.reduce(
        (s, l) => s
          .setIn([getClassLinkKey(l), 'x'], l.x)
          .setIn([getClassLinkKey(l), 'y'], l.y),
        state,
        action.classLinks
      );

    case actions.UPDATE_GRAPH_SCHEMA_CLASS_LINK_POSITION: {
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

    case actions.UPDATE_GRAPH_SCHEMA_CLASS_LINK_LENGTHS:
      return state.withMutations((mutableState) => {
        action.classLinks.forEach((classLink) =>
          mutableState.setIn(
            [getClassLinkKey(action.classLink), 'length'],
            classLink.length
          )
        );
      });

    default:
      return state;
  }
}

const initialUiState = Map({
  drag: {},
  shouldUpdateClassLinkLengths: false,
});

function reduceUiState(state = initialUiState, action) {
  switch (action.type) {
    case actions.START_GRAPH_SCHEMA_CLASS_DRAG:
      return state.setIn(
        ['drag', 'class'],
        Map({
          name: action.name,
          fromX: action.fromX,
          fromY: action.fromY,
        })
      );

    case actions.START_GRAPH_SCHEMA_CLASS_LINK_DRAG:
      return state.setIn(
        ['drag', 'classLink'],
        Map({
          source: action.classLink.source,
          name: action.classLink.name,
          target: action.classLink.target,
          fromX: action.fromX,
          fromY: action.fromY,
        })
      );

    case actions.STOP_GRAPH_SCHEMA_DRAG:
      return state
        .deleteIn(['drag', 'class'])
        .deleteIn(['drag', 'classLink']);

    case actions.UPDATE_GRAPH_SCHEMA_ELEMENT_POSITIONS:
      return state.set('shouldUpdateClassLinkLengths', true);

    case actions.UPDATE_GRAPH_SCHEMA_CLASS_POSITION:
      return state.set('shouldUpdateClassLinkLengths', true);

    case actions.UPDATE_GRAPH_SCHEMA_CLASS_LINK_POSITION:
      return state.set('shouldUpdateClassLinkLengths', true);

    case actions.UPDATE_GRAPH_SCHEMA_CLASS_LINK_LENGTHS:
      return state.set('shouldUpdateClassLinkLengths', false);

    default:
      return state;
  }
}

const {combineReducers} = require('redux-immutable');

module.exports = combineReducers({
  classes: reduceClassesState,
  classLinks: reduceClassLinksState,
  ui: reduceUiState,
});
