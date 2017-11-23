const React = require('react');

module.exports = ({ children }) => {
  return (
    <nav className="navbar is-fixed">
      <div className="navbar-brand">
        <div className="navbar-item">SEAWEED</div>
      </div>
      <div className="navbar-menu is-active">{children}</div>
    </nav>
  );
};
