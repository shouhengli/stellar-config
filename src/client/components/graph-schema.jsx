const React = require('react');
const {connect} = require('react-redux');
const R = require('ramda');

const Arrow = require('./graph-schema-arrow.jsx');
const ClassLink = require('./graph-schema-class-link.jsx');
const {ClassLinkPath} = require('./graph-schema-class-link-path.jsx');
const ClassLinkLabel = require('./graph-schema-class-link-label.jsx');
const Class = require('./graph-schema-class.jsx');

const {getClassLinkId} = require('../graph-schema');
const {
  updateClassLinkLengthsAsync,
  updateClassPosition,
  updateClassLinkPosition,
  stopDrag,
} = require('../action-creators/graph-schema');

class GraphSchema extends React.Component {
  constructor(props) {
    super(props);
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

    this.classLinkPaths = [];

    return (
      <svg
        className="graph-schema"
        width="100%"
        height="100%"
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
              classLinks.map((l, i) => {
                return (
                  <ClassLink key={JSON.stringify(getClassLinkId(l.toJS()))}>
                    <ClassLinkPath
                      ref={(p) => this.classLinkPaths.push({l, p})}
                      id={i}
                      x0={classes.getIn([l.source, 'x'])}
                      y0={classes.getIn([l.source, 'y'])}
                      x1={l.get('x')}
                      y1={l.get('y')}
                      x2={classes.getIn([l.target, 'x'])}
                      y2={classes.getIn([l.target, 'y'])}
                      markerId="graph-schema-arrow" />
                    <ClassLinkLabel id={i} classLink={l} />
                  </ClassLink>
                );
              })
            }
          </g>
          <g className="graph-schema-classes">
            {
              classes.toList().map((c, i) => {
                return <Class key={c.get('name')} cls={c} />;
              })
            }
          </g>
        </g>
      </svg>
    );
  }

  componentDidUpdate() {
    if (this.props.shouldUpdateClassLinkLengths) {
      this.props.updateClassLinkLengths(this.classLinkPaths);
    }
  }
}

function mapStateToProps(state) {
  const graphSchemaState = state.get('graphSchema');
  const classes = graphSchemaState.get('classes');
  const classLinks = graphSchemaState.get('classLinks').toList();

  const shouldUpdateClassLinkLengths = graphSchemaState.getIn(
    ['ui', 'shouldUpdateClassLinkLengths']
  );

  const draggedClass = graphSchemaState.getIn(['ui', 'drag', 'class']);
  const draggedClassLink = graphSchemaState.getIn(['ui', 'drag', 'classLink']);

  return {
    classes,
    classLinks,
    shouldUpdateClassLinkLengths,
    draggedClass,
    draggedClassLink,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    updateClassLinkLengths: (classLinksPaths) => updateClassLinkLengthsAsync(
      classLinksPaths.map(({l, p}) => {
        const classLink = l.toJS();
        classLink.length = p.getLength();
        return classLink;
      })
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
  };
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(GraphSchema);
