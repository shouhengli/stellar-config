import React from 'react';
import { connect } from 'react-redux';
import { defaultTo, values } from 'ramda';
import { Map } from 'immutable';

import Arrow from '../components/graph-schema-arrow.jsx';
import ClassLink from '../components/graph-schema-class-link.jsx';
import ClassLinkPath from '../components/graph-schema-class-link-path.jsx';
import ClassLinkLabel from './graph-schema-class-link-label.jsx';
import Class from './graph-schema-class.jsx';
import GraphSchema from '../components/graph-schema.jsx';

import {
  GraphSchemaFormatError,
  getClassLinkKey,
  parseYaml
} from '../ingestion-profile';

import {
  editorContentSelector,
  shouldUpdateClassLinkLengthsSelector,
  dimensionsSelector,
  coordinatesSelector,
  panSelector,
  zoomSelector,
  dragSelector
} from '../selectors/ui/graph-schema';

import { classesSelector } from '../selectors/ui/graph-schema-classes';
import {
  classLinksSelector
} from '../selectors/ui/graph-schema-class-links';

import {
  setLayoutDimensionsAndCoordinates,
  startLayoutAsync,
  startPan,
  stopDrag,
  stopLayoutAsync,
  updateClassLinkLengthsAsync,
  updateClassLinkPosition,
  updateClassPosition,
  updatePan,
  zoom
} from '../action-creators/ui/graph-schema';

import {
  loadGraphSchemaContent
} from '../action-creators/ingestion-profile';

function mapStateToProps(state) {
  return {
    editorContent: editorContentSelector(state),
    classes: classesSelector(state),
    classLinks: classLinksSelector(state),
    shouldUpdateClassLinkLengths: shouldUpdateClassLinkLengthsSelector(state),
    dimensions: dimensionsSelector(state),
    coordinates: coordinatesSelector(state),
    drag: dragSelector(state),
    zoom: zoomSelector(state),
    pan: panSelector(state)
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
    .then(() => parseYaml(editorContent))
    .then(({ classes, classLinks }) => {
      const [defaultX, defaultY] = layoutDimensions.map(d => d / 2);

      classes.forEach(cls => {
        cls.x = defaultTo(defaultX, currentClasses.getIn([cls.name, 'x']));
        cls.y = defaultTo(defaultY, currentClasses.getIn([cls.name, 'y']));
      });

      classLinks.forEach(l => {
        l.x = defaultTo(
          defaultX,
          currentClassLinks.getIn([getClassLinkKey(l), 'x'])
        );

        l.y = defaultTo(
          defaultY,
          currentClassLinks.getIn([getClassLinkKey(l), 'y'])
        );
      });

      dispatch(loadGraphSchemaContent(classes, classLinks));

      return { classes, classLinks };
    })
    .then(({ classes, classLinks }) =>
      dispatch(startLayoutAsync(classes, classLinks, layoutDimensions))
    )
    .catch(GraphSchemaFormatError, error => {
      console.log(error.message);
    });
}

function mapDispatchToProps(dispatch) {
  return {
    updateClassLinkLengths: classLinkPaths =>
      dispatch(
        updateClassLinkLengthsAsync(
          values(classLinkPaths).map(({ l, p }) => {
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

        dispatch(
          updateClassPosition(
            draggedClass.get('name'),
            event.pageX / zoom - draggedClass.get('fromX'),
            event.pageY / zoom - draggedClass.get('fromY')
          )
        );
      } else if (drag.has('classLink')) {
        // If a graph class link is being dragged...
        const draggedClassLink = drag.get('classLink');

        dispatch(
          updateClassLinkPosition(
            draggedClassLink.get('name'),
            draggedClassLink.get('source'),
            draggedClassLink.get('target'),
            event.pageX / zoom - draggedClassLink.get('fromX'),
            event.pageY / zoom - draggedClassLink.get('fromY')
          )
        );
      } else if (drag.has('pan')) {
        // If the viewport is being dragged...
        const pan = drag.get('pan');

        dispatch(
          updatePan(
            event.pageX / zoom - pan.get('fromX'),
            event.pageY / zoom - pan.get('fromY')
          )
        );
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

    handleEditorContentChange: (
      editorContent,
      layoutDimensions,
      currentClasses,
      currentClassLinks
    ) =>
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
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(props => (
  <GraphSchema
    Arrow={Arrow}
    ClassLink={ClassLink}
    ClassLinkPath={ClassLinkPath}
    ClassLinkLabel={ClassLinkLabel}
    Class={Class}
    {...props}
  />
));
