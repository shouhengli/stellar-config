const P = require('bluebird');
import actions from '../../actions';
const layout = require('../../force-layout');
const layoutWorker = new Worker('/force-layout-worker.js');

function startClassDrag(name, fromX, fromY) {
  return {
    type: actions.GRAPH_SCHEMA_START_CLASS_DRAG,
    name,
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

function updateGraphSchemaElementPositions(classes, classLinks) {
  return {
    type: actions.GRAPH_SCHEMA_UPDATE_ELEMENT_POSITIONS,
    classes,
    classLinks
  };
}

function updateClassPosition(className, dx, dy) {
  return {
    type: actions.GRAPH_SCHEMA_UPDATE_CLASS_POSITION,
    name: className,
    dx,
    dy
  };
}

function updateClassLinkPosition(
  classLinkName,
  classLinkSource,
  classLinkTarget,
  dx,
  dy
) {
  return {
    type: actions.GRAPH_SCHEMA_UPDATE_CLASS_LINK_POSITION,
    name: classLinkName,
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
              updateGraphSchemaElementPositions(
                event.data.classes,
                event.data.classLinks
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
        classes,
        classLinks,
        dimensions
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

function revealClassPropTooltip(className, propName) {
  return {
    type: actions.GRAPH_SCHEMA_REVEAL_CLASS_PROP_TOOLTIP,
    className,
    propName
  };
}

function hideClassPropTooltip(className, propName) {
  return {
    type: actions.GRAPH_SCHEMA_HIDE_CLASS_PROP_TOOLTIP,
    className,
    propName
  };
}

function updateClassOuterRadius(className, outerRadius) {
  return {
    type: actions.GRAPH_SCHEMA_UPDATE_CLASS_OUTER_RADIUS,
    className,
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

function setEditorContent(content) {
  return {
    type: actions.GRAPH_SCHEMA_SET_EDITOR_CONTENT,
    content
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
  updatePan,
  zoom,
  setEditorContent
};
