const React = require('react');

module.exports = ({children}) => {
  return (
    <nav className="navbar is-fixed">
      <div className="navbar-brand">
        <div className="navbar-item">
          SEAWEED
        </div>
      </div>
      <div className="navbar-menu">
        <div className="navbar-start">
          {children}
        </div>
      </div>
    </nav>
  );
};
