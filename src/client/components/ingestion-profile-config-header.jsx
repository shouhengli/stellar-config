const React = require('react');
const NavItem = require('./nav-item.jsx');

const {
  TAB_SOURCE,
  TAB_GRAPH_SCHEMA,
  TAB_MAPPING,
} = require('../ingestion-profile');

const tabs = [TAB_SOURCE, TAB_GRAPH_SCHEMA, TAB_MAPPING];

const Tab = ({children}) => <li>{children}</li>;

const ActiveTab = ({children}) =>
  <li className="is-active">{children}</li>;

const TabLink = ({handleClick, value}) =>
  <a onClick={() => handleClick(value)}>{value}</a>;

module.exports = ({configName, activeTab, handleTabClick}) =>
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
          {
            tabs.map((tab) => {
              const tabLink =
                <TabLink value={tab} handleClick={handleTabClick} />;

              return tab === activeTab
                   ? <ActiveTab key={tab}>{tabLink}</ActiveTab>
                   : <Tab key={tab}>{tabLink}</Tab>;
            })
          }
        </ul>
      </div>
    </NavItem>,
  ];
