const {connect} = require('react-redux');
const {revealSearch} = require('../action-creators/search');
const Toggle = require('../components/config-search-toggle.jsx');

function mapDispatchToProps(dispatch) {
  return {
    handleClick: () =>
      dispatch(revealSearch()),
  };
}

module.exports = connect(null, mapDispatchToProps)(Toggle);
