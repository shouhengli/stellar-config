const React = require('react');

module.exports = ({name, radius, fontSize, zoom, handleMouseDown}) => {
  return (
    <g
      className="graph-schema-class-name"
      onMouseDown={(event) => handleMouseDown(event, name, zoom)}>
      <circle r={radius} />
      <text textAnchor="middle" dy={fontSize / 2}>
        {name}
      </text>
    </g>
  );
};
