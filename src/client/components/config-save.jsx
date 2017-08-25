const React = require('react');
const {connect} = require('react-redux');

const actions = require('../actions');

const {
  CONFIG_STATUS_NORMAL,
  CONFIG_STATUS_CHANGED,
  CONFIG_STATUS_SAVING,
} = require('../config-status');

const Save = ({configType, configName, configContent, configStatus, handleClick}) => {
  switch (configStatus) {
    case CONFIG_STATUS_CHANGED:
      return (
        <button
          className="button is-white"
          onClick={() => handleClick(configType, configName, configContent)}>
          <span className="icon is-small">
            <i className="fa fa-upload"></i>
          </span>
        </button>
      );
    case CONFIG_STATUS_SAVING:
      return (
        <button className="button is-white is-loading">
          <span className="icon is-small">
            <i className="fa fa-spinner"></i>
          </span>
        </button>
      );
    default:
      return null;
  }
};

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
    handleClick: (configType, configName, configContent) => Promise
      .resolve(dispatch(actions.setEditConfigStatus(CONFIG_STATUS_SAVING)))
      .then(() =>
        dispatch(actions.saveEditConfigAsync(configType, configName, configContent))
      )
      .then(() => dispatch(actions.setEditConfigStatus(CONFIG_STATUS_NORMAL))),
  };
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(Save);
