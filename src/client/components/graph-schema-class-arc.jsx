const React = require('react');

module.exports = props => {
  const {
    path,
    globalIndex,
    classPropName,
    handleMouseOver,
    handleMouseOut
  } = props;

  return (
    <g className="graph-schema-class-arc">
      <path
        d={path}
        onMouseOver={() => handleMouseOver(globalIndex, classPropName)}
        onMouseOut={() => handleMouseOut(globalIndex, classPropName)}
      />
    </g>
  );
};
