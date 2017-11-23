const React = require('react');

module.exports = ({ children, label, items }) => (
  <div className="navbar-item has-dropdown is-hoverable ">
    <a className="navbar-link">{label}</a>
    <div className="navbar-dropdown">
      {items.map(item => (
        <a key={item} className="navbar-item">
          {item}
        </a>
      ))}
    </div>
  </div>
);
