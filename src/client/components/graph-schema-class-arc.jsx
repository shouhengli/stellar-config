const React = require('react');
const {connect} = require('react-redux');

const {
  revealClassPropTooltip,
  hideClassPropTooltip,
} = require('../action-creators/graph-schema');

const ClassArc = (props) => {
  const {
    path,
    className,
    classPropName,
    handleMouseOver,
    handleMouseOut,
  } = props;

  return (
    <g className="graph-schema-class-arc">
      <path d={path}
        onMouseOver={() => handleMouseOver(className, classPropName)}
        onMouseOut={() => handleMouseOut(className, classPropName)} />
    </g>
  );
};

function mapDispatchToProps(dispatch) {
  return {
    handleMouseOver: (className, classPropName) =>
      dispatch(revealClassPropTooltip(className, classPropName)),
    handleMouseOut: (className, classPropName) =>
      dispatch(hideClassPropTooltip(className, classPropName)),
  };
}

module.exports = connect(null, mapDispatchToProps)(ClassArc);
