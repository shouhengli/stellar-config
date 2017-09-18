const {connect} = require('react-redux');
const Item = require('../components/config-search-item.jsx');
const {hideSearch} = require('../action-creators/search');
const {loadEditConfigAsync} = require('../action-creators/edit');

function mapDispatchToProps(dispatch) {
  return {
    handleClick: (configType, configName) =>
      dispatch(loadEditConfigAsync(configType, configName))
        .then(() => dispatch(hideSearch())),
  };
}

module.exports = connect(null, mapDispatchToProps)(Item);
