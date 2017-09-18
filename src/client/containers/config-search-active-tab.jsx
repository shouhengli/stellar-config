const {connect} = require('react-redux');
const {loadSearchConfigNamesAsync} = require('../action-creators/search');
const ActiveTab = require('../components/config-search-active-tab.jsx');

function mapDispatchToProps(dispatch) {
  return {
    loadConfigNames: (configType) =>
      dispatch(loadSearchConfigNamesAsync(configType)),
  };
}

module.exports = connect(null, mapDispatchToProps)(ActiveTab);
