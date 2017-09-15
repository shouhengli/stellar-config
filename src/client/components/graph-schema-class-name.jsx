const React = require('react');
const {connect} = require('react-redux');

const {startClassDrag, stopLayoutAsync} =
  require('../action-creators/graph-schema');

const ClassName = ({name, radius, fontSize, zoom, handleMouseDown}) => {
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

function mapStateToProps(state) {
  return {
    zoom: state.getIn(['graphSchema', 'ui', 'zoom']),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    handleMouseDown: (event, className, zoom) => {
      event.preventDefault();
      event.stopPropagation();
      const {pageX, pageY} = event;

      dispatch(stopLayoutAsync())
        .then(() => dispatch(
          startClassDrag(className, pageX / zoom, pageY / zoom)
        ));
    },
  };
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(ClassName);
