const {connect} = require('react-redux');
const Tab = require('../components/config-search-tab.jsx');
const {setSearchActiveConfigType} = require('../action-creators/search');

function mapDispatchToProps(dispatch) {
  return {
    handleClick: (configType) =>
      dispatch(setSearchActiveConfigType(configType)),
  };
}

module.exports = connect(null, mapDispatchToProps)(Tab);
