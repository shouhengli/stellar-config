import { fromJS, List, Map } from 'immutable';
import actions from '../../actions';
import { ZOOM_STEP, MAX_ZOOM, MIN_ZOOM } from '../../ingestion-profile';

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
const initialState = fromJS({
  drag: {},
  shouldUpdateClassLinkLengths: false,
  dimensions: [0, 0],
  coordinates: [0, 0],
  pan: {
    x: 0,
    y: 0
  },
  zoom: 1
});

export default function reduce(state = initialState, action) {
  switch (action.type) {
    case actions.GRAPH_SCHEMA_UPDATE_CONTENT:
      return state
        .set('shouldUpdateClassLinkLengths', false)
        .set('zoom', 1)
        .set('pan', Map({ x: 0, y: 0 }));

    case actions.GRAPH_SCHEMA_START_CLASS_DRAG:
      return state.setIn(
        ['drag', 'class'],
        Map({
          name: action.name,
          fromX: action.fromX,
          fromY: action.fromY
        })
      );

    case actions.GRAPH_SCHEMA_START_CLASS_LINK_DRAG:
      return state.setIn(
        ['drag', 'classLink'],
        Map({
          source: action.classLink.source,
          name: action.classLink.name,
          target: action.classLink.target,
          fromX: action.fromX,
          fromY: action.fromY
        })
      );

    case actions.GRAPH_SCHEMA_START_PAN:
      return state.setIn(
        ['drag', 'pan'],
        Map({
          fromX: action.fromX,
          fromY: action.fromY
        })
      );

    case actions.GRAPH_SCHEMA_STOP_DRAG:
      return state.set('drag', Map());

    case actions.GRAPH_SCHEMA_UPDATE_ELEMENT_POSITIONS:
      return state.set('shouldUpdateClassLinkLengths', true);

    case actions.GRAPH_SCHEMA_UPDATE_CLASS_POSITION:
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

    case actions.GRAPH_SCHEMA_UPDATE_CLASS_LINK_POSITION:
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

    case actions.GRAPH_SCHEMA_UPDATE_PAN:
      return state
        .setIn(
        ['drag', 'pan', 'fromX'],
        state.getIn(['drag', 'pan', 'fromX']) + action.dx
        )
        .setIn(
        ['drag', 'pan', 'fromY'],
        state.getIn(['drag', 'pan', 'fromY']) + action.dy
        )
        .setIn(['pan', 'x'], state.getIn(['pan', 'x']) + action.dx)
        .setIn(['pan', 'y'], state.getIn(['pan', 'y']) + action.dy);

    case actions.GRAPH_SCHEMA_UPDATE_CLASS_LINK_LENGTHS:
      return state.set('shouldUpdateClassLinkLengths', false);

    case actions.GRAPH_SCHEMA_SET_DIMENSIONS_AND_COORDINATES:
      return state
        .set('dimensions', List(action.dimensions))
        .set('coordinates', List(action.coordinates));

    case actions.GRAPH_SCHEMA_ZOOM: {
      const panX = state.getIn(['pan', 'x']);
      const panY = state.getIn(['pan', 'y']);
      const zoom0 = state.get('zoom');
      const zoom1 = Math.min(
        Math.max(zoom0 + action.offset * ZOOM_STEP, MIN_ZOOM),
        MAX_ZOOM
      );
      const { w, h } = action;

      return state
        .set('zoom', zoom1)
        .setIn(['pan', 'x'], w / zoom1 - w / zoom0 + panX)
        .setIn(['pan', 'y'], h / zoom1 - h / zoom0 + panY);
    }

    default:
      return state;
  }
}
