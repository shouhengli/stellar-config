const React = require('react');

module.exports = (props) => {
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
