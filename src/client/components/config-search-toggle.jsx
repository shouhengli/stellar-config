const React = require('react');

module.exports = ({ handleClick }) => {
  return (
    <span className="button" onClick={() => handleClick()}>
      <span className="icon">
        <i className="fa fa-search" />
      </span>
    </span>
  );
};
