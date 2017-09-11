const React = require('react');
const {connect} = require('react-redux');

const {startClassLinkDrag, stopLayoutAsync} =
  require('../action-creators/graph-schema');

const {CLASS_LINK_LABEL_MARGIN} = require('../graph-schema');

const ClassLinkLabel = (props) => {
  const {
    id,
    classLink,
    zoom,
    handleMouseDown,
  } = props;

  return (
    <text
      textAnchor="middle"
      dx={classLink.get('length') / 2}
      dy={-CLASS_LINK_LABEL_MARGIN}
      onMouseDown={(event) => handleMouseDown(event, classLink, zoom)}>
      <textPath xlinkHref={`#graph-schema-class-link-path-${id}`}>
        {classLink.get('name')}
      </textPath>
    </text>
  );
};

function mapStateToProps(state) {
  return {
    zoom: state.getIn(['graphSchema', 'ui', 'zoom']),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    handleMouseDown: (event, classLink, zoom) => {
      event.preventDefault();
      event.stopPropagation();

      const {pageX, pageY} = event;

      dispatch(stopLayoutAsync())
        .then(() => dispatch(
          startClassLinkDrag(classLink.toJS(), pageX / zoom, pageY / zoom)
        ));
    },
  };
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(ClassLinkLabel);
