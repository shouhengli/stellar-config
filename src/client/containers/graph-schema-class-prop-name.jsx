const { connect } = require('react-redux');

const ClassPropName = require('../components/graph-schema-class-prop-name.jsx');

const {
  revealClassPropTooltip,
  hideClassPropTooltip
} = require('../action-creators/ui/split-view/graph-schema');

function mapDispatchToProps(dispatch) {
  return {
    handleMouseOver: (globalIndex, classPropName) =>
      dispatch(revealClassPropTooltip(globalIndex, classPropName)),
    handleMouseOut: (globalIndex, classPropName) =>
      dispatch(hideClassPropTooltip(globalIndex, classPropName))
  };
}

module.exports = connect(null, mapDispatchToProps)(ClassPropName);
