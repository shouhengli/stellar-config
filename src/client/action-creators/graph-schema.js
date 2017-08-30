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

function stopClassDrag(name) {
  return {
    type: actions.STOP_GRAPH_SCHEMA_CLASS_DRAG,
    name,
  };
}

function startClassLinkDrag(name, source, target, fromX, fromY) {
  return {
    type: actions.START_GRAPH_SCHEMA_CLASS_LINK_DRAG,
    name,
    source,
    target,
    fromX,
    fromY,
  };
}

function stopClassLinkDrag(name, source, target) {
  return {
    type: actions.STOP_GRAPH_SCHEMA_CLASS_LINK_DRAG,
    name,
    source,
    target,
  };
}

function updateGraphSchemaElementPositions(classes, classLinks) {
  return {
    type: actions.UPDATE_GRAPH_SCHEMA_ELEMENT_POSITIONS,
    classes,
    classLinks,
  };
}

function initLayoutAsync() {
  return (dispatch) => Promise.resolve(
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
  return () => Promise.resolve(
    layoutWorker.postMessage({
      type: layout.START_GRAPH_SCHEMA_SIMULATION,
      classes,
      classLinks,
      dimensions,
    })
  );
}

function stopLayoutAsync() {
  return () => Promise.resolve(
    layoutWorker.postMessage({
      type: layout.STOP_GRAPH_SCHEMA_SIMULATION,
    })
  );
}

module.exports = {
  startClassDrag,
  stopClassDrag,
  startClassLinkDrag,
  stopClassLinkDrag,
  initLayoutAsync,
  startLayoutAsync,
  stopLayoutAsync,
};
