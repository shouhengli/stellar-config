const React = require('react');
const {connect} = require('react-redux');
const R = require('ramda');

const Arrow = require('./graph-schema-arrow.jsx');
const ClassLink = require('./graph-schema-class-link.jsx');
const {ClassLinkPath} = require('./graph-schema-class-link-path.jsx');
const ClassLinkLabel = require('./graph-schema-class-link-label.jsx');
const Class = require('./graph-schema-class.jsx');

const {
  GraphSchemaFormatError,
  getClassLinkId,
  parseYaml,
} = require('../graph-schema');

const {
  loadGraphSchemaElements,
  setLayoutDimensions,
  startLayoutAsync,
  stopDrag,
  stopLayoutAsync,
  updateClassLinkLengthsAsync,
  updateClassLinkPosition,
  updateClassPosition,
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
      classes,
      classLinks,
      handleMouseMove,
      handleMouseUp,
      draggedClass,
      draggedClassLink,
    } = this.props;

    return (
      <svg
        ref={(ref) => this.svg = ref}
        className="graph-schema"
        onMouseMove={
          (event) => handleMouseMove(event, draggedClass, draggedClassLink)
        }
        onMouseUp={() => handleMouseUp()}>
        <g>
          <defs>
            <Arrow id="graph-schema-arrow" />
          </defs>
          <g className="graph-schema-class-links">
            {
              classLinks.map((l) => {
                return (
                  <ClassLink key={JSON.stringify(getClassLinkId(l.toJS()))}>
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
        this.props.dimensions.toJS()
      );
    } else if (this.props.shouldUpdateClassLinkLengths) {
      this.props.updateClassLinkLengths(this.classLinkPaths);
    }
  }

  componentDidMount() {
    this.props.init(
      [this.svg.clientWidth, this.svg.clientHeight],
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
  const classLinks = graphSchemaState.get('classLinks').toList();

  const uiState = graphSchemaState.get('ui');
  const shouldUpdateClassLinkLengths = uiState.get('shouldUpdateClassLinkLengths');
  const dimensions = uiState.get('dimensions');
  const draggedClass = uiState.getIn(['drag', 'class']);
  const draggedClassLink = uiState.getIn(['drag', 'classLink']);

  return {
    editorContent,
    classes,
    classLinks,
    shouldUpdateClassLinkLengths,
    draggedClass,
    draggedClassLink,
    dimensions,
  };
}

function handleEditorContentChange(dispatch, editorContent, layoutDimensions) {
  dispatch(stopLayoutAsync())
    .then(() => parseYaml(editorContent))
    .then(({classes, classLinks}) => {
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

    handleMouseMove: (event, draggedClass, draggedClassLink) => {
      if (R.not(R.isNil(draggedClass))) {
        dispatch(updateClassPosition(
          draggedClass.get('name'),
          event.clientX - draggedClass.get('fromX'),
          event.clientY - draggedClass.get('fromY')
        ));
      } else if (R.not(R.isNil(draggedClassLink))) {
        dispatch(updateClassLinkPosition(
          draggedClassLink.get('name'),
          draggedClassLink.get('source'),
          draggedClassLink.get('target'),
          event.clientX - draggedClassLink.get('fromX'),
          event.clientY - draggedClassLink.get('fromY')
        ));
      }
    },

    handleMouseUp: () => dispatch(stopDrag()),

    init: (dimensions, editorContent) => {
      dispatch(setLayoutDimensions(dimensions));
      handleEditorContentChange(dispatch, editorContent, dimensions);
    },

    stopLayout: () => dispatch(stopLayoutAsync()),

    handleEditorContentChange: (editorContent, layoutDimensions) =>
      handleEditorContentChange(dispatch, editorContent, layoutDimensions),
  };
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(GraphSchema);
