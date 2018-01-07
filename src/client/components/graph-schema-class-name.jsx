const React = require('react');

module.exports = ({
  globalIndex,
  name,
  radius,
  fontSize,
  zoom,
  handleMouseDown
}) => {
  return (
    <g
      className="graph-schema-class-name"
      onMouseDown={event => handleMouseDown(event, globalIndex, zoom)}
    >
      <circle r={radius} />
      <text textAnchor="middle" dy={fontSize / 2}>
        {name}
      </text>
    </g>
  );
};
