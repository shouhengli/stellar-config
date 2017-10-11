const React = require('react');
const NavItem = require('./nav-item.jsx');

module.exports = ({configName}) =>
  [
    <NavItem key="icon">
      <span className="icon">
        <i className="fa fa-file-o"></i>
      </span>
      {configName}
    </NavItem>,
    <NavItem key="tabs">
      <div className="tabs is-toggle">
        <ul>
          <li className="is-active"><a>Source</a></li>
          <li><a>Mapping</a></li>
          <li><a>Graph Schema</a></li>
        </ul>
      </div>
    </NavItem>,
  ];
