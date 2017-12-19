import React from 'react';
import { connect } from 'react-redux';
import { values, compose } from 'ramda';
import { fromJS } from 'immutable';

import Arrow from '../components/graph-schema-arrow.jsx';
import ClassLink from '../components/graph-schema-class-link.jsx';
import ClassLinkPath from '../components/graph-schema-class-link-path.jsx';
import ClassLinkLabel from './graph-schema-class-link-label.jsx';
import Class from './graph-schema-class.jsx';
import GraphSchema from '../components/graph-schema.jsx';

import { GraphSchemaFormatError } from '../ingestion-profile';

import {
  shouldUpdateClassLinkLengthsSelector,
  dimensionsSelector,
  coordinatesSelector,
  panSelector,
  zoomSelector,
  dragSelector
} from '../selectors/ui/split-view/graph-schema';

import {
  positionedStagedClassSelector,
  stagedClassesSelector
} from '../selectors/ui/split-view/graph-schema-classes';
import {
  positionedStagedClassLinksSelector,
  stagedClassLinksSelector
} from '../selectors/ui/split-view/graph-schema-class-links';

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
  zoom,
  loadGraphSchemaElementPositions
} from '../action-creators/ui/split-view/graph-schema';

function mapStateToProps(state) {
  return {
    positionedClasses: positionedStagedClassSelector(state),
    positionedClassLinks: positionedStagedClassLinksSelector(state),
    classes: stagedClassesSelector(state),
    classLinks: stagedClassLinksSelector(state),
    shouldUpdateClassLinkLengths: shouldUpdateClassLinkLengthsSelector(state),
    dimensions: dimensionsSelector(state),
    coordinates: coordinatesSelector(state),
    drag: dragSelector(state),
    zoom: zoomSelector(state),
    pan: panSelector(state)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    updateClassLinkLengths: classLinkPaths =>
      dispatch(
        updateClassLinkLengthsAsync(
          values(classLinkPaths).map(({ l, p }) =>
            l.set('length', p.getLength())
          )
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

    setLayoutDimensionsAndCoordinates: compose(
      dispatch,
      setLayoutDimensionsAndCoordinates
    ),

    stopLayout: () => dispatch(stopLayoutAsync()),

    loadGraphSchemaElementPositions: (
      positionedClasses,
      positionedClassLinks,
      layoutDimensions
    ) => {
      dispatch(stopLayoutAsync())
        .then(() => {
          const [defaultX, defaultY] = layoutDimensions.map(d => d / 2).toJS();
          dispatch(
            loadGraphSchemaElementPositions(
              positionedClasses.map(cls =>
                fromJS({
                  x: defaultX,
                  y: defaultY,
                  tooltipVisibleProp: cls.get('tooltipVisibleProp'),
                  outerRadius: cls.get('outerRadius'),
                  globalIndex: cls.get('globalIndex')
                })
              ),
              positionedClassLinks.map(l =>
                fromJS({
                  x: defaultX,
                  y: defaultY,
                  length: l.get('length'),
                  globalIndex: l.get('globalIndex')
                })
              )
            )
          );

          return [positionedClasses, positionedClassLinks];
        })
        .then(([positionedClasses, positionedClassLinks]) =>
          dispatch(
            startLayoutAsync(
              positionedClasses,
              positionedClassLinks,
              layoutDimensions
            )
          )
        )
        .catch(GraphSchemaFormatError, error => {
          console.log(error.message);
        });
    },
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

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  ...stateProps,
  ...dispatchProps,
  init(dimensions, coordinates) {
    dispatchProps.setLayoutDimensionsAndCoordinates(dimensions, coordinates);
    dispatchProps.loadGraphSchemaElementPositions(
      stateProps.positionedClasses,
      stateProps.positionedClassLinks,
      dimensions
    );
  }
});

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(
  props => (
    <GraphSchema
      Arrow={Arrow}
      ClassLink={ClassLink}
      ClassLinkPath={ClassLinkPath}
      ClassLinkLabel={ClassLinkLabel}
      Class={Class}
      {...props}
    />
  )
);
