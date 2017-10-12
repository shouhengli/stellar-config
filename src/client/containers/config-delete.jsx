const {connect} = require('react-redux');
const ConfigDelete = require('../components/config-delete.jsx');

const {
  setConfigDeleteName,
  hideConfigDelete,
  deleteConfigAsync,
  resetEditConfig,
} = require('../action-creators/ingestion-profile');

function mapStateToProps(state) {
  const configType = state.getIn(['edit', 'type']);
  const configName = state.getIn(['edit', 'name']);
  const configDeleteName = state.getIn(['ui', 'configDeleteName']);
  const confirmed = configDeleteName === configName;

  return {
    configType,
    configName,
    configDeleteName,
    confirmed,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    handleNameChange: (event) =>
      dispatch(setConfigDeleteName(event.target.value)),

    handleCloseButtonClick: () =>
      dispatch(hideConfigDelete()),

    handleDeleteButtonClick: (configType, configName) =>
      dispatch(deleteConfigAsync(configType, configName))
        .then(() => dispatch(resetEditConfig()))
        .then(() => dispatch(setConfigDeleteName('')))
        .then(() => dispatch(hideConfigDelete())),
  };
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(ConfigDelete);
