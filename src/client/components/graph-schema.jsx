const React = require('react');
const {connect} = require('react-redux');
const R = require('ramda');
const {Map} = require('immutable');

const Arrow = require('./graph-schema-arrow.jsx');
const ClassLink = require('./graph-schema-class-link.jsx');
const {ClassLinkPath} = require('./graph-schema-class-link-path.jsx');
const ClassLinkLabel = require('./graph-schema-class-link-label.jsx');
const Class = require('./graph-schema-class.jsx');

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


class GraphSchema extends React.Component {
  constructor(props) {
    super(props);

    this.classLinkPaths = {};
  }

  static get displayName() {
    return 'Graph Schema';
  }

  render() {
    const {
      classLinks,
      classes,
      drag,
      handleMouseMove,
      handleMouseUp,
      handleMouseDown,
      handleWheel,
      zoom,
      pan,
      coordinates,
    } = this.props;

    return (
      <svg
        ref={(ref) => this.svg = ref}
        className="graph-schema"
        onMouseMove={
          (event) => handleMouseMove(
            event,
            drag,
            zoom
          )
        }
        onMouseUp={() => handleMouseUp()}
        onMouseDown={(event) => handleMouseDown(event, zoom)}
        onWheel={(event) => handleWheel(event, coordinates, drag)}>
        <g
          transform={
            `scale(${zoom}) translate(${pan.get('x')}, ${pan.get('y')})`
          }>
          <defs>
            <Arrow id="graph-schema-arrow" />
          </defs>
          <g className="graph-schema-class-links">
            {
              classLinks.toList().map((l) => {
                return (
                  <ClassLink key={getClassLinkKey(l)}>
                    <ClassLinkPath
                      ref={
                        (p) => {
                          if (R.isNil(p)) {
                            delete this.classLinkPaths[l.get('globalIndex')];
                          } else {
                            this.classLinkPaths[l.get('globalIndex')] = {l, p};
                          }
                        }
                      }
                      id={l.get('globalIndex')}
                      x0={classes.getIn([l.get('source'), 'x'])}
                      y0={classes.getIn([l.get('source'), 'y'])}
                      x1={l.get('x')}
                      y1={l.get('y')}
                      x2={classes.getIn([l.get('target'), 'x'])}
                      y2={classes.getIn([l.get('target'), 'y'])}
                      markerId="graph-schema-arrow" />
                    <ClassLinkLabel
                      id={l.get('globalIndex')}
                      classLink={l} />
                  </ClassLink>
                );
              })
            }
          </g>
          <g className="graph-schema-classes">
            {
              classes.toList().map((c) => {
                return <Class key={c.get('name')} cls={c} />;
              })
            }
          </g>
        </g>
      </svg>
    );
  }

  componentDidUpdate(prevProps) {
    if (prevProps.editorContent !== this.props.editorContent) {
      this.props.handleEditorContentChange(
        this.props.editorContent,
        this.props.dimensions.toJS(),
        this.props.classes,
        this.props.classLinks
      );
    } else if (this.props.shouldUpdateClassLinkLengths) {
      this.props.updateClassLinkLengths(this.classLinkPaths);
    }
  }

  componentDidMount() {
    const {left, top} = this.svg.getBoundingClientRect();
    this.props.init(
      [this.svg.clientWidth, this.svg.clientHeight],
      [left, top],
      this.props.editorContent
    );
  }

  componentWillUnmount() {
    this.props.stopLayout();
  }
}

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
    .then(() => parseYaml(editorContent))
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
        const draggedClass = drag.get('class');

        dispatch(updateClassPosition(
          draggedClass.get('name'),
          event.pageX / zoom - draggedClass.get('fromX'),
          event.pageY / zoom - draggedClass.get('fromY')
        ));
      } else if (drag.has('classLink')) {
        const draggedClassLink = drag.get('classLink');

        dispatch(updateClassLinkPosition(
          draggedClassLink.get('name'),
          draggedClassLink.get('source'),
          draggedClassLink.get('target'),
          event.pageX / zoom - draggedClassLink.get('fromX'),
          event.pageY / zoom - draggedClassLink.get('fromY')
        ));
      } else if (drag.has('pan')) {
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

module.exports = connect(mapStateToProps, mapDispatchToProps)(GraphSchema);
