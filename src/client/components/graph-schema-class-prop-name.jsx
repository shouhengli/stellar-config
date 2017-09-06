const React = require('react');
const {connect} = require('react-redux');

const {
  revealClassPropTooltip,
  hideClassPropTooltip,
} = require('../action-creators/graph-schema');

const ClassPropName = (props) => {
  const {
    id,
    rotation,
    clipPath,
    classPropNameArcPath,
    classPropNameVisibility,
    classPropNameRadius,
    className,
    classPropName,
    fontSize,
    handleMouseOver,
    handleMouseOut,
  } = props;

  return (
    <g className="graph-schema-class-prop-name"
      transform={`rotate(${rotation})`}
      clipPath={clipPath}>
      <path
        id={`graph-schema-class-prop-name-path-${id}`}
        d={classPropNameArcPath} />
      <text visibility={classPropNameVisibility}
        dx={Math.PI * classPropNameRadius}
        dy={fontSize / 2}
        textAnchor="middle"
        onMouseOver={() => handleMouseOver(className, classPropName)}
        onMouseOut={() => handleMouseOut(className, classPropName)}>
        <textPath xlinkHref={`#graph-schema-class-prop-name-path-${id}`}>
          {classPropName}
        </textPath>
      </text>
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

module.exports = connect(null, mapDispatchToProps)(ClassPropName);
