const {fromJS, List, Map} = require('immutable');
const actions = require('../../actions');

const {ZOOM_STEP, MAX_ZOOM, MIN_ZOOM} = require('../../graph-schema');

/**
 * Initial UI state.
 *
 * The shouldUpdateClassLinkLengths field will be set to true when the position
 * of any graph schema class or class link is changed. Then related React
 * components can readjust their visualisation and reset this field to false
 * afterwards.
 *
 * @type {Map}
 */
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

module.exports = reduceUiState;
