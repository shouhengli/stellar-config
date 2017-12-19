const { connect } = require('react-redux');

const {
  revealClassPropTooltip,
  hideClassPropTooltip
} = require('../action-creators/ui/split-view/graph-schema');

const ClassArc = require('../components/graph-schema-class-arc.jsx');

function mapDispatchToProps(dispatch) {
  return {
    handleMouseOver: (globalIndex, classPropName) =>
      dispatch(revealClassPropTooltip(globalIndex, classPropName)),
    handleMouseOut: (globalIndex, classPropName) =>
      dispatch(hideClassPropTooltip(globalIndex, classPropName))
  };
}

module.exports = connect(null, mapDispatchToProps)(ClassArc);
