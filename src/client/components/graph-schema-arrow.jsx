const React = require('react');

const Arrow = ({id}) => {
  return (
    <marker id={id}
      viewBox="0 0 10 10"
      refX={0} refY={5}
      markerWidth={10} markerHeight={10}
      orient="auto">
      <path d="M0,0L10,5L0,10Z" />
    </marker>
  );
};

module.exports = Arrow;
