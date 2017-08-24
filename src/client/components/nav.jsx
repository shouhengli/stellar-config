const React = require('react');

const NavItem = ({children}) =>
  <div className="navbar-item">{children}</div>;

const Nav = ({children}) => {
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

module.exports = {
  Nav,
  NavItem,
};
