const React = require('react');
const {connect} = require('react-redux');

const {startClassDrag, stopLayoutAsync} =
  require('../action-creators/graph-schema');

const ClassName = ({name, radius, fontSize, handleMouseDown}) => {
  return (
    <g
      className="graph-schema-class-name"
      onMouseDown={(event) => handleMouseDown(event)}>
      <circle r={radius}>
        <text textAnchor="middle" dy={fontSize / 2}>
          {name}
        </text>
      </circle>
    </g>
  );
};

function mapDispatchToProps(dispatch) {
  return {
    handleMouseDown: (event, className) => {
      event.preventDefault();

      dispatch(stopLayoutAsync())
        .then(() => dispatch(
          startClassDrag(className, event.clientX, event.clientY)
        ));
    },
  };
}

module.exports = connect(null, mapDispatchToProps)(ClassName);
