const React = require('react');

module.exports = ({ handleClick }) => {
  return (
    <span className="button is-danger" onClick={() => handleClick()}>
      <span className="icon">
        <i className="fa fa-trash" />
      </span>
    </span>
  );
};
