const {connect} = require('react-redux');
const Item = require('../components/config-search-item.jsx');
const {hideSearch} = require('../action-creators/search');
const {loadIngestionProfileAsync} = require('../action-creators/ingestion-profile');

function mapDispatchToProps(dispatch) {
  return {
    handleClick: (configType, configName) =>
      dispatch(loadIngestionProfileAsync(configType, configName))
        .then(() => dispatch(hideSearch())),
  };
}

module.exports = connect(null, mapDispatchToProps)(Item);
