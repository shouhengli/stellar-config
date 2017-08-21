const React = require('react');
const {connect} = require('react-redux');
const actions = require('../actions');

const Tab = ({title, handleClick}) =>
  <a onClick={() => handleClick(title)}>{title}</a>;

function mapDispatchToProps(dispatch) {
  return {
    handleClick: (configType) =>
      dispatch(actions.setActiveConfigSearchTab(configType)),
  };
}

module.exports = connect(null, mapDispatchToProps)(Tab);
