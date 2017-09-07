const React = require('react');
const {connect} = require('react-redux');

const {startClassDrag, stopLayoutAsync} =
  require('../action-creators/graph-schema');

const ClassName = ({name, radius, fontSize, handleMouseDown}) => {
  return (
    <g
      className="graph-schema-class-name"
      onMouseDown={(event) => handleMouseDown(event, name)}>
      <circle r={radius} />
      <text textAnchor="middle" dy={fontSize / 2}>
        {name}
      </text>
    </g>
  );
};

function mapDispatchToProps(dispatch) {
  return {
    handleMouseDown: (event, className) => {
      event.preventDefault();
      const {clientX, clientY} = event;

      dispatch(stopLayoutAsync())
        .then(() => dispatch(
          startClassDrag(className, clientX, clientY)
        ));
    },
  };
}

module.exports = connect(null, mapDispatchToProps)(ClassName);
