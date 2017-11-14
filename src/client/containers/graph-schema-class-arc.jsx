const {connect} = require('react-redux');

const {
  revealClassPropTooltip,
  hideClassPropTooltip,
} = require('../action-creators/ui/graph-schema');

const ClassArc = require('../components/graph-schema-class-arc.jsx');

function mapDispatchToProps(dispatch) {
  return {
    handleMouseOver: (className, classPropName) =>
      dispatch(revealClassPropTooltip(className, classPropName)),
    handleMouseOut: (className, classPropName) =>
      dispatch(hideClassPropTooltip(className, classPropName)),
  };
}

module.exports = connect(null, mapDispatchToProps)(ClassArc);
