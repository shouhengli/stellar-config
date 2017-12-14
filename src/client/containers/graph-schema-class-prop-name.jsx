const { connect } = require('react-redux');

const ClassPropName = require('../components/graph-schema-class-prop-name.jsx');

const {
  revealClassPropTooltip,
  hideClassPropTooltip
} = require('../action-creators/ui/split-view/graph-schema');

function mapDispatchToProps(dispatch) {
  return {
    handleMouseOver: (className, classPropName) =>
      dispatch(revealClassPropTooltip(className, classPropName)),
    handleMouseOut: (className, classPropName) =>
      dispatch(hideClassPropTooltip(className, classPropName))
  };
}

module.exports = connect(null, mapDispatchToProps)(ClassPropName);
