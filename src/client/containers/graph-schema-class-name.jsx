const {connect} = require('react-redux');

const {startClassDrag, stopLayoutAsync} =
  require('../action-creators/graph-schema');

const ClassName = require('../components/graph-schema-class-name.jsx');

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
