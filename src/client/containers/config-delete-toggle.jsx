const {connect} = require('react-redux');
const {revealConfigDelete} = require('../action-creators/edit');
const Toggle = require('../components/config-delete-toggle.jsx');

function mapDispatchToProps(dispatch) {
  return {
    handleClick: () =>
      dispatch(revealConfigDelete()),
  };
}

module.exports = connect(null, mapDispatchToProps)(Toggle);
