const R = require('ramda');
const {fromJS, List, Map} = require('immutable');
const actions = require('../actions');
const {getClassLinkKey} = require('../graph-schema');

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
            [getClassLinkKey(classLink), 'length'],
            classLink.length
          )
        );
      });

    default:
      return state;
  }
}

const ZOOM_STEP = 0.02;
const MIN_ZOOM = 0.1;
const MAX_ZOOM = 5;

const initialUiState = fromJS({
  drag: {},
  shouldUpdateClassLinkLengths: false,
  dimensions: [0, 0],
  pan: {
    x: 0,
    y: 0,
  },
  zoom: 1,
});

function reduceUiState(state = initialUiState, action) {
  switch (action.type) {
    case actions.LOAD_GRAPH_SCHEMA_ELEMENTS:
      return state
        .set('shouldUpdateClassLinkLengths', false)
        .set('zoom', 1)
        .set('pan', Map({x: 0, y: 0}));

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

    case actions.START_GRAPH_SCHEMA_PAN:
      return state.setIn(
        ['drag', 'pan'],
        Map({
          fromX: action.fromX,
          fromY: action.fromY,
        })
      );

    case actions.STOP_GRAPH_SCHEMA_DRAG:
      return state.set('drag', Map());

    case actions.UPDATE_GRAPH_SCHEMA_ELEMENT_POSITIONS:
      return state.set('shouldUpdateClassLinkLengths', true);

    case actions.UPDATE_GRAPH_SCHEMA_CLASS_POSITION:
      return state
        .setIn(
          ['drag', 'class', 'fromX'],
          state.getIn(['drag', 'class', 'fromX']) + action.dx
        )
        .setIn(
          ['drag', 'class', 'fromY'],
          state.getIn(['drag', 'class', 'fromY']) + action.dy
        )
        .set('shouldUpdateClassLinkLengths', true);

    case actions.UPDATE_GRAPH_SCHEMA_CLASS_LINK_POSITION:
      return state
        .setIn(
          ['drag', 'classLink', 'fromX'],
          state.getIn(['drag', 'classLink', 'fromX']) + action.dx
        )
        .setIn(
          ['drag', 'classLink', 'fromY'],
          state.getIn(['drag', 'classLink', 'fromY']) + action.dy
        )
        .set('shouldUpdateClassLinkLengths', true);

    case actions.UPDATE_GRAPH_SCHEMA_PAN:
      return state
        .setIn(
          ['drag', 'pan', 'fromX'],
          state.getIn(['drag', 'pan', 'fromX']) + action.dx
        )
        .setIn(
          ['drag', 'pan', 'fromY'],
          state.getIn(['drag', 'pan', 'fromY']) + action.dy
        )
        .setIn(
          ['pan', 'x'],
          state.getIn(['pan', 'x']) + action.dx
        )
        .setIn(
          ['pan', 'y'],
          state.getIn(['pan', 'y']) + action.dy
        );

    case actions.UPDATE_GRAPH_SCHEMA_CLASS_LINK_LENGTHS:
      return state.set('shouldUpdateClassLinkLengths', false);

    case actions.SET_GRAPH_SCHEMA_DIMENSIONS_AND_COORDINATES:
      return state
        .set('dimensions', List(action.dimensions))
        .set('coordinates', List(action.coordinates));

    case actions.ZOOM_GRAPH_SCHEMA: {
      const panX = state.getIn(['pan', 'x']);
      const panY = state.getIn(['pan', 'y']);
      const zoom0 = state.get('zoom');
      const zoom1 = Math.min(
        Math.max(
          zoom0 + action.offset * ZOOM_STEP,
          MIN_ZOOM
        ),
        MAX_ZOOM
      );
      const {w, h} = action;

      return state
        .set('zoom', zoom1)
        .setIn(['pan', 'x'], w / zoom1 - w / zoom0 + panX)
        .setIn(['pan', 'y'], h / zoom1 - h / zoom0 + panY);
    }

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
