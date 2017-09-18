const React = require('react');

const {
  CONFIG_STATUS_CHANGED,
  CONFIG_STATUS_SAVING,
} = require('../config-status');

module.exports =
  ({configType, configName, configContent, configStatus, handleClick}) => {
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
