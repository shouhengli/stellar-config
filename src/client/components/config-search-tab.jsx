const React = require('react');
const {connect} = require('react-redux');
const {setSearchActiveConfigType} = require('../action-creators/search');

const Tab = ({title, handleClick}) =>
  <a onClick={() => handleClick(title)}>{title}</a>;

function mapDispatchToProps(dispatch) {
  return {
    handleClick: (configType) =>
      dispatch(setSearchActiveConfigType(configType)),
  };
}

module.exports = connect(null, mapDispatchToProps)(Tab);
