const React = require('react');
const {connect} = require('react-redux');
const R = require('ramda');
const {Map} = require('immutable');

const Arrow = require('../components/graph-schema-arrow.jsx');
const ClassLink = require('../components/graph-schema-class-link.jsx');
const ClassLinkPath = require('../components/graph-schema-class-link-path.jsx');
const ClassLinkLabel = require('./graph-schema-class-link-label.jsx');
const Class = require('./graph-schema-class.jsx');
const GraphSchema = require('../components/graph-schema.jsx');

const {
  GraphSchemaFormatError,
  getClassLinkKey,
  parseYaml,
} = require('../graph-schema');

const {
  loadGraphSchemaElements,
  setLayoutDimensionsAndCoordinates,
  startLayoutAsync,
  startPan,
  stopDrag,
  stopLayoutAsync,
  updateClassLinkLengthsAsync,
  updateClassLinkPosition,
  updateClassPosition,
  updatePan,
  zoom,
} = require('../action-creators/graph-schema');


function mapStateToProps(state) {
  const editorContent = state.getIn(['edit', 'content']);

  const graphSchemaState = state.get('graphSchema');
  const classes = graphSchemaState.get('classes');
  const classLinks = graphSchemaState.get('classLinks');

  const uiState = graphSchemaState.get('ui');
  const shouldUpdateClassLinkLengths = uiState.get('shouldUpdateClassLinkLengths');
  const dimensions = uiState.get('dimensions');
  const coordinates = uiState.get('coordinates');
  const drag = uiState.get('drag');
  const zoom = uiState.get('zoom');
  const pan = uiState.get('pan');

  return {
    editorContent,
    classes,
    classLinks,
    shouldUpdateClassLinkLengths,
    dimensions,
    coordinates,
    drag,
    zoom,
    pan,
  };
}

function handleEditorContentChange(
  dispatch,
  editorContent,
  layoutDimensions,
  currentClasses = Map(),
  currentClassLinks = Map()
) {
  dispatch(stopLayoutAsync())
    .then(() => parseYaml(editorContent.get('yaml')))
    .then(({classes, classLinks}) => {
      const [defaultX, defaultY] = layoutDimensions.map((d) => d / 2);

      classes.forEach((cls) => {
        cls.x = R.defaultTo(defaultX, currentClasses.getIn([cls.name, 'x']));
        cls.y = R.defaultTo(defaultY, currentClasses.getIn([cls.name, 'y']));
      });

      classLinks.forEach((l) => {
        l.x = R.defaultTo(
          defaultX,
          currentClassLinks.getIn([getClassLinkKey(l), 'x'])
        );

        l.y = R.defaultTo(
          defaultY,
          currentClassLinks.getIn([getClassLinkKey(l), 'y'])
        );
      });

      dispatch(loadGraphSchemaElements(classes, classLinks));

      return {classes, classLinks};
    })
    .then(({classes, classLinks}) =>
      dispatch(startLayoutAsync(classes, classLinks, layoutDimensions))
    )
    .catch(
      GraphSchemaFormatError,
      (error) => {
        console.log(error.message);
      }
    );
}

function mapDispatchToProps(dispatch) {
  return {
    updateClassLinkLengths: (classLinkPaths) =>
      dispatch(
        updateClassLinkLengthsAsync(
          R.values(classLinkPaths).map(({l, p}) => {
            const classLink = l.toJS();
            classLink.length = p.getLength();
            return classLink;
          })
        )
      ),

    handleMouseMove: (event, drag, zoom) => {
      if (drag.has('class')) {
        // If a graph class is being dragged...
        const draggedClass = drag.get('class');

        dispatch(updateClassPosition(
          draggedClass.get('name'),
          event.pageX / zoom - draggedClass.get('fromX'),
          event.pageY / zoom - draggedClass.get('fromY')
        ));
      } else if (drag.has('classLink')) {
        // If a graph class link is being dragged...
        const draggedClassLink = drag.get('classLink');

        dispatch(updateClassLinkPosition(
          draggedClassLink.get('name'),
          draggedClassLink.get('source'),
          draggedClassLink.get('target'),
          event.pageX / zoom - draggedClassLink.get('fromX'),
          event.pageY / zoom - draggedClassLink.get('fromY')
        ));
      } else if (drag.has('pan')) {
        // If the viewport is being dragged...
        const pan = drag.get('pan');

        dispatch(updatePan(
          event.pageX / zoom - pan.get('fromX'),
          event.pageY / zoom - pan.get('fromY')
        ));
      }
    },

    handleMouseUp: () => {
      event.stopPropagation();

      dispatch(stopDrag());
    },

    handleMouseDown: (event, zoom) => {
      event.preventDefault();
      event.stopPropagation();

      dispatch(startPan(event.pageX / zoom, event.pageY / zoom));
    },

    init: (dimensions, coordinates, editorContent) => {
      dispatch(setLayoutDimensionsAndCoordinates(dimensions, coordinates));
      handleEditorContentChange(dispatch, editorContent, dimensions);
    },

    stopLayout: () => dispatch(stopLayoutAsync()),

    handleEditorContentChange:
      (editorContent, layoutDimensions, currentClasses, currentClassLinks) =>
        handleEditorContentChange(
          dispatch,
          editorContent,
          layoutDimensions,
          currentClasses,
          currentClassLinks
        ),

    handleWheel: (event, coordinates, drag) => {
      event.preventDefault();
      event.stopPropagation();

      if (drag.isEmpty()) {
        const x = event.pageX - coordinates.get(0);
        const y = event.pageY - coordinates.get(1);

        if (event.deltaY > 0) {
          dispatch(zoom(1, x, y));
        } else if (event.deltaY < 0) {
          dispatch(zoom(-1, x, y));
        }
      }
    },
  };
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(
  (props) => <GraphSchema
               Arrow={Arrow}
               ClassLink={ClassLink}
               ClassLinkPath={ClassLinkPath}
               ClassLinkLabel={ClassLinkLabel}
               Class={Class}
               {...props} />
);
