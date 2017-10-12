const {connect} = require('react-redux');
const P = require('bluebird');
const Save = require('../components/config-save.jsx');

const {setEditConfigStatus, saveEditConfigAsync} = require('../action-creators/ingestion-profile');

const {
  CONFIG_STATUS_NORMAL,
  CONFIG_STATUS_SAVING,
} = require('../config-status');

function mapStateToProps(state) {
  const configType = state.getIn(['edit', 'type']);
  const configName = state.getIn(['edit', 'name']);
  const configContent = state.getIn(['edit', 'content']);
  const configStatus = state.getIn(['edit', 'status']);

  return {
    configType,
    configName,
    configContent,
    configStatus,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    handleClick: (configType, configName, configContent) => P
      .resolve(dispatch(setEditConfigStatus(CONFIG_STATUS_SAVING)))
      .then(() =>
        dispatch(saveEditConfigAsync(configType, configName, configContent))
      )
      .then(() => dispatch(setEditConfigStatus(CONFIG_STATUS_NORMAL))),
  };
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(Save);
