const React = require('react');

module.exports = ({configDeleteName, handleChange}) => {
  return (
    <input
      className="input is-danger"
      type="text"
      value={configDeleteName}
      onChange={(event) => handleChange(event)} />
  );
};
