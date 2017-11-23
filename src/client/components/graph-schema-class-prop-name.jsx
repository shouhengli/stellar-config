const React = require('react');

module.exports = props => {
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
    handleMouseOut
  } = props;

  return (
    <g
      className="graph-schema-class-prop-name"
      transform={`rotate(${rotation})`}
      clipPath={clipPath}>
      <path
        id={`graph-schema-class-prop-name-path-${id}`}
        d={classPropNameArcPath}
      />
      <text
        visibility={classPropNameVisibility}
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
