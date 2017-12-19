const P = require('bluebird');
import actions from '../../../actions';
const layout = require('../../../force-layout');
const layoutWorker = new Worker('/force-layout-worker.js');
import { fromJS, Map } from 'immutable';

function startClassDrag(globalIndex, fromX, fromY) {
  return {
    type: actions.GRAPH_SCHEMA_START_CLASS_DRAG,
    globalIndex,
    fromX,
    fromY
  };
}

function startClassLinkDrag(classLink, fromX, fromY) {
  return {
    type: actions.GRAPH_SCHEMA_START_CLASS_LINK_DRAG,
    classLink,
    fromX,
    fromY
  };
}

function startPan(fromX, fromY) {
  return {
    type: actions.GRAPH_SCHEMA_START_PAN,
    fromX,
    fromY
  };
}

function stopDrag() {
  return { type: actions.GRAPH_SCHEMA_STOP_DRAG };
}

function loadGraphSchemaElementPositions(classes, classLinks) {
  return {
    type: actions.GRAPH_SCHEMA_UPDATE_ELEMENT_POSITIONS,
    classes,
    classLinks
  };
}

function updateClassPosition(globalIndex, dx, dy) {
  return {
    type: actions.GRAPH_SCHEMA_UPDATE_CLASS_POSITION,
    globalIndex: globalIndex,
    dx,
    dy
  };
}

function updateClassLinkPosition(
  globalIndex,
  classLinkSource,
  classLinkTarget,
  dx,
  dy
) {
  return {
    type: actions.GRAPH_SCHEMA_UPDATE_CLASS_LINK_POSITION,
    globalIndex: globalIndex,
    source: classLinkSource,
    target: classLinkTarget,
    dx,
    dy
  };
}

function updatePan(dx, dy) {
  return {
    type: actions.GRAPH_SCHEMA_UPDATE_PAN,
    dx,
    dy
  };
}

function setLayoutDimensionsAndCoordinates(dimensions, coordinates) {
  return {
    type: actions.GRAPH_SCHEMA_SET_DIMENSIONS_AND_COORDINATES,
    dimensions,
    coordinates
  };
}

function initLayoutAsync() {
  return dispatch =>
    P.resolve().then(
      () =>
        (layoutWorker.onmessage = event => {
          if (
            event.data.type === layout.GRAPH_SCHEMA_UPDATE_ELEMENT_POSITIONS
          ) {
            dispatch(
              loadGraphSchemaElementPositions(
                fromJS(event.data.classes).reduce(
                  (s, c) => s.set(c.get('globalIndex'), c),
                  Map()
                ),
                fromJS(event.data.classLinks).reduce(
                  (s, l) => s.set(l.get('globalIndex'), l),
                  Map()
                )
              )
            );
          }
        })
    );
}

function startLayoutAsync(classes, classLinks, dimensions) {
  return () =>
    P.resolve().then(() =>
      layoutWorker.postMessage({
        type: layout.START_GRAPH_SCHEMA_SIMULATION,
        classes: classes.valueSeq().toJS(),
        classLinks: classLinks.valueSeq().toJS(),
        dimensions: dimensions.toJS()
      })
    );
}

function stopLayoutAsync() {
  return () =>
    P.resolve().then(() =>
      layoutWorker.postMessage({
        type: layout.STOP_GRAPH_SCHEMA_SIMULATION
      })
    );
}

function revealClassPropTooltip(globalIndex, propName) {
  return {
    type: actions.GRAPH_SCHEMA_REVEAL_CLASS_PROP_TOOLTIP,
    globalIndex,
    propName
  };
}

function hideClassPropTooltip(globalIndex, propName) {
  return {
    type: actions.GRAPH_SCHEMA_HIDE_CLASS_PROP_TOOLTIP,
    globalIndex,
    propName
  };
}

function updateClassOuterRadius(globalIndex, outerRadius) {
  return {
    type: actions.GRAPH_SCHEMA_UPDATE_CLASS_OUTER_RADIUS,
    globalIndex,
    outerRadius
  };
}

function updateClassLinkLengths(classLinks) {
  return {
    type: actions.GRAPH_SCHEMA_UPDATE_CLASS_LINK_LENGTHS,
    classLinks
  };
}

function updateClassLinkLengthsAsync(classLinks) {
  return dispatch =>
    P.resolve().then(() => dispatch(updateClassLinkLengths(classLinks)));
}

function zoom(offset, w, h) {
  return {
    type: actions.GRAPH_SCHEMA_ZOOM,
    offset,
    w,
    h
  };
}

module.exports = {
  startClassDrag,
  startClassLinkDrag,
  startPan,
  stopDrag,
  setLayoutDimensionsAndCoordinates,
  initLayoutAsync,
  startLayoutAsync,
  stopLayoutAsync,
  revealClassPropTooltip,
  hideClassPropTooltip,
  updateClassOuterRadius,
  updateClassLinkLengthsAsync,
  updateClassPosition,
  updateClassLinkPosition,
  loadGraphSchemaElementPositions,
  updatePan,
  zoom
};
