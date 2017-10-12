const {connect} = require('react-redux');
const Toggle = require('../components/new-config-toggle.jsx');
const {revealNewConfig} = require('../action-creators/ingestion-profile');

function mapDispatchToProps(dispatch) {
  return {
    handleClick: () =>
      dispatch(revealNewConfig()),
  };
}

module.exports = connect(null, mapDispatchToProps)(Toggle);
