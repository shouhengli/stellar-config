const React = require('react');

const Arrow = require('./graph-schema-arrow.jsx');

const GraphSchema = () => {
  return (
    <svg width="100%" height="100%">
      <g>
        <g className="graph-schema-class-links">
          <defs>
            <Arrow id="graph-schema-arrow" />
          </defs>
        </g>
      </g>
    </svg>
  );
};

module.exports = GraphSchema;
