const React = require('react');

const ClassLink = ({children}) => {
  return (
    <g className="graph-schema-class-link">
      {children}
    </g>
  );
};

module.exports = ClassLink;
