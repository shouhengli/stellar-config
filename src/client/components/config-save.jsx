const React = require('react');

const {
  CONFIG_STATUS_CHANGED,
  CONFIG_STATUS_SAVING,
} = require('../config-status');

module.exports =
  ({
    name,
    content,
    status,
    handleClick,
  }) => {
    switch (status) {
      case CONFIG_STATUS_CHANGED:
        return (
          <span
            className="button is-primary"
            onClick={
              () => handleClick(name, content)
            }>
            <span className="icon">
              <i className="fa fa-upload"></i>
            </span>
          </span>
        );
      case CONFIG_STATUS_SAVING:
        return (
          <span className="button is-loading">
            <span className="icon">
              <i className="fa fa-spinner"></i>
            </span>
          </span>
        );
      default:
        return null;
    }
  };
