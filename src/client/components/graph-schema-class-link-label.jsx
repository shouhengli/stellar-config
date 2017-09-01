const React = require('react');
const {connect} = require('react-redux');

const {startClassLinkDrag, stopLayoutAsync} =
  require('../action-creators/graph-schema');

const {CLASS_LINK_LABEL_MARGIN} = require('../graph-schema');

const ClassLinkLabel = (props) => {
  const {
    id,
    classLink,
    handleMouseDown,
  } = props;

  return (
    <text textAnchor="middle"
      dx={classLink.get('length')} dy={-CLASS_LINK_LABEL_MARGIN}
      onMouseDown={(event) => handleMouseDown(event, classLink)}>
      <textPath xlinkHref={`#graph-schema-class-link-path-${id}`}>
        {classLink.get('name')}
      </textPath>
    </text>
  );
};

function mapDispatchToProps(dispatch) {
  return {
    handleMouseDown: (event, classLink) => {
      event.preventDefault();

      dispatch(stopLayoutAsync())
        .then(() => dispatch(
          startClassLinkDrag(classLink.toJS(), event.clientX, event.clientY)
        ));
    },
  };
}

module.exports = connect(null, mapDispatchToProps)(ClassLinkLabel);
