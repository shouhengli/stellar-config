const React = require('react');

module.exports = ({handleClick}) => {
  return (
    <button className="button is-white" onClick={() => handleClick()}>
      <span className="icon is-small">
        <i className="fa fa-trash"></i>
      </span>
    </button>
  );
};
