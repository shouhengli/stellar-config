const React = require('react');

module.exports = ({configType, configName, handleClick}) => {
  return (
    <button
      className="button is-danger"
      onClick={() => handleClick(configType, configName)}>
      Delete
    </button>
  );
};
