const {connect} = require('react-redux');

const {startClassLinkDrag, stopLayoutAsync} =
  require('../action-creators/ui/graph-schema');

const ClassLinkLabel = require('../components/graph-schema-class-link-label.jsx');

const {zoomSelector} = require('../selectors/ui/graph-schema');

function mapStateToProps(state) {
  return {zoom: zoomSelector(state)};
}

function mapDispatchToProps(dispatch) {
  return {
    handleMouseDown: (event, classLink, zoom) => {
      event.preventDefault();
      event.stopPropagation();

      const {pageX, pageY} = event;

      dispatch(stopLayoutAsync())
        .then(() => dispatch(
          startClassLinkDrag(classLink.toJS(), pageX / zoom, pageY / zoom)
        ));
    },
  };
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(ClassLinkLabel);
