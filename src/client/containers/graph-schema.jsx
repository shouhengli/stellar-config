import React from 'react';
import { connect } from 'react-redux';
import { defaultTo, values, isNil } from 'ramda';
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
  createUIClassesAndLinksFromGraphSchema
} from '../ingestion-profile';

import { graphSchemaSelector } from '../selectors/ingestion-profile';

import {
  shouldUpdateClassLinkLengthsSelector,
  dimensionsSelector,
  coordinatesSelector,
  panSelector,
  zoomSelector,
  dragSelector
} from '../selectors/ui/split-view/graph-schema';

import { relatedClassesSelector } from '../selectors/ui/split-view/graph-schema-classes';
import {
  stagedClassLinksSelector,
  classLinksSelector
} from '../selectors/ui/split-view/graph-schema-class-links';
import { selectedClassSelector } from '../selectors/ui/split-view';

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
} from '../action-creators/ui/split-view/graph-schema';

import { loadGraphSchemaContent } from '../action-creators/ingestion-profile';

function mapStateToProps(state) {
  return {
    classes: relatedClassesSelector(state),
    classLinks: isNil(selectedClassSelector(state))
      ? classLinksSelector(state)
      : stagedClassLinksSelector(state),
    graphSchema: graphSchemaSelector(state),
    shouldUpdateClassLinkLengths: shouldUpdateClassLinkLengthsSelector(state),
    dimensions: dimensionsSelector(state),
    coordinates: coordinatesSelector(state),
    drag: dragSelector(state),
    zoom: zoomSelector(state),
    pan: panSelector(state)
  };
}

function handleGraphSchemaChange(
  dispatch,
  graphSchema,
  layoutDimensions,
  currentClasses = Map(),
  currentClassLinks = Map()
) {
  dispatch(stopLayoutAsync())
    .then(() => createUIClassesAndLinksFromGraphSchema(graphSchema))
    .then(({ classes, classLinks }) => {
      const [defaultX, defaultY] = layoutDimensions.map(d => d / 2);

      const transformedClasses = classes.map(cls =>
        cls
          .set(
          'x',
          defaultTo(defaultX, currentClasses.getIn([cls.get('name'), 'x']))
          )
          .set(
          'y',
          defaultTo(defaultY, currentClasses.getIn([cls.get('name'), 'y']))
          )
      );

      const transformedClassLinks = classLinks.map(l =>
        l
          .set(
          'x',
          defaultTo(
            defaultX,
            currentClassLinks.getIn([getClassLinkKey(l), 'x'])
          )
          )
          .set(
          'y',
          defaultTo(
            defaultY,
            currentClassLinks.getIn([getClassLinkKey(l), 'y'])
          )
          )
      );

      dispatch(
        loadGraphSchemaContent(transformedClasses, transformedClassLinks)
      );

      return [transformedClasses, transformedClassLinks];
    })
    .then(([classes, classLinks]) =>
      dispatch(
        startLayoutAsync(classes.toJS(), classLinks.toJS(), layoutDimensions)
      )
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

    init: (dimensions, coordinates, graphSchema) => {
      dispatch(setLayoutDimensionsAndCoordinates(dimensions, coordinates));
      handleGraphSchemaChange(dispatch, graphSchema, dimensions);
    },

    stopLayout: () => dispatch(stopLayoutAsync()),

    handleGraphSchemaChange: (
      graphSchema,
      layoutDimensions,
      currentClasses,
      currentClassLinks
    ) =>
      handleGraphSchemaChange(
        dispatch,
        graphSchema,
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
