const P = require('bluebird');
const actions = require('../actions');
const layout = require('../force-layout');
const layoutWorker = new Worker('/force-layout.js');

function startClassDrag(name, fromX, fromY) {
  return {
    type: actions.START_GRAPH_SCHEMA_CLASS_DRAG,
    name,
    fromX,
    fromY,
  };
}

function startClassLinkDrag(classLink, fromX, fromY) {
  return {
    type: actions.START_GRAPH_SCHEMA_CLASS_LINK_DRAG,
    classLink,
    fromX,
    fromY,
  };
}

function stopDrag() {
  return {type: actions.STOP_GRAPH_SCHEMA_DRAG};
}

function updateGraphSchemaElementPositions(classes, classLinks) {
  return {
    type: actions.UPDATE_GRAPH_SCHEMA_ELEMENT_POSITIONS,
    classes,
    classLinks,
  };
}

function updateClassPosition(className, dx, dy) {
  return {
    type: actions.UPDATE_GRAPH_SCHEMA_CLASS_POSITION,
    name: className,
    dx,
    dy,
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
    type: actions.UPDATE_GRAPH_SCHEMA_CLASS_LINK_POSITION,
    name: classLinkName,
    source: classLinkSource,
    target: classLinkTarget,
    dx,
    dy,
  };
}

function initLayoutAsync() {
  return (dispatch) => P.resolve().then(() =>
    layoutWorker.onmessage((event) => {
      if (event.data.type === layout.UPDATE_GRAPH_SCHEMA_ELEMENT_POSITIONS) {
        dispatch(updateGraphSchemaElementPositions(
          event.data.classes,
          event.data.classLinks
        ));
      }
    })
  );
}

function startLayoutAsync(classes, classLinks, dimensions) {
  return () => P.resolve().then(() =>
    layoutWorker.postMessage({
      type: layout.START_GRAPH_SCHEMA_SIMULATION,
      classes,
      classLinks,
      dimensions,
    })
  );
}

function stopLayoutAsync() {
  return () => P.resolve().then(() =>
    layoutWorker.postMessage({
      type: layout.STOP_GRAPH_SCHEMA_SIMULATION,
    })
  );
}

function revealClassPropTooltip(className, propName) {
  return {
    type: actions.REVEAL_GRAPH_SCHEMA_CLASS_PROP_TOOLTIP,
    className,
    propName,
  };
}

function hideClassPropTooltip(className, propName) {
  return {
    type: actions.HIDE_GRAPH_SCHEMA_CLASS_PROP_TOOLTIP,
    className,
    propName,
  };
}

function updateClassOuterRadius(className, outerRadius) {
  return {
    type: actions.UPDATE_GRAPH_SCHEMA_CLASS_OUTER_RADIUS,
    className,
    outerRadius,
  };
}

function updateClassLinkLengths(classLinks) {
  return {
    type: actions.UPDATE_GRAPH_SCHEMA_CLASS_LINK_LENGTHS,
    classLinks,
  };
}

function updateClassLinkLengthsAsync(classLinks) {
  return (dispatch) => P.resolve().then(() =>
    dispatch(updateClassLinkLengths(classLinks))
  );
}

module.exports = {
  startClassDrag,
  startClassLinkDrag,
  stopDrag,
  initLayoutAsync,
  startLayoutAsync,
  stopLayoutAsync,
  revealClassPropTooltip,
  hideClassPropTooltip,
  updateClassOuterRadius,
  updateClassLinkLengthsAsync,
  updateClassPosition,
  updateClassLinkPosition,
};
