const React = require('react');

const ClassPropTooltip = (props) => {
  const {
    id,
    rotation,
    classPropTooltipArcPath,
    classPropTooltipRadius,
    visible,
    classPropName,
  } = props;

  return (
    <g
      className="graph-schema-class-prop-tooltip"
      transform={`rotate(${rotation})`}>
      <path
        id={`graph-schema-class-prop-tooltip-path-${id}`}
        d={classPropTooltipArcPath} />
      <text textAnchor="middle"
        dx={Math.PI * classPropTooltipRadius}
        visibility={visible ? 'visible' : 'hidden'}>
        <textPath xlinkHref={`#graph-schema-class-prop-tooltip-path-${id}`}>
          {classPropName}
        </textPath>
      </text>
    </g>
  );
};

module.exports = ClassPropTooltip;
