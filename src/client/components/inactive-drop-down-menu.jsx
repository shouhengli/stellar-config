const React = require('react');

module.exports = ({children, handleButtonClick}) =>
  <div className="dropdown">
    <div className="dropdown-trigger">
      <button
        className="button"
        onClick={() => handleButtonClick()}>
        {children}
        <span className="icon is-small">
          <i className="fa fa-angle-down"></i>
        </span>
      </button>
    </div>
  </div>;
