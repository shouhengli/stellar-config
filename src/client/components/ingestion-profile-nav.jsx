const React = require('react');

const Nav = require('./nav.jsx');
const NavItem = require('./nav-item.jsx');
const NavMenuStart = require('./nav-menu-start.jsx');
const NavMenuEnd = require('./nav-menu-end.jsx');
const NavDropDown = require('./nav-drop-down.jsx');
const Header = require('./ingestion-profile-config-header.jsx');
const Save = require('./config-save.jsx');
const SearchToggle = require('./config-search-toggle.jsx');
const NewToggle = require('./config-new-toggle.jsx');
const DeleteToggle = require('./config-delete-toggle.jsx');

const {isNotEmpty} = require('../util');

module.exports =
  ({
    configName,
    configStatus,
    resolveConfigContent,
    handleSaveClick,
    handleSearchToggleClick,
    handleNewToggle,
    handleDeleteToggle,
  }) =>
    <Nav>
      <NavMenuStart>
        <NavDropDown
          label="Ingestion Profile"
          items={['Ingestion Profile', 'Monitor']}/>
        {
          isNotEmpty(configName) &&
          <Header configName={configName} />
        }
      </NavMenuStart>
      <NavMenuEnd>
        <NavItem>
          <Save
            configName={configName}
            configStatus={configStatus}
            resolveConfigContent={resolveConfigContent}
            handleClick={handleSaveClick} />
          <SearchToggle handleClick={handleSearchToggleClick} />
          <NewToggle handleClick={handleNewToggle} />
          {
            isNotEmpty(configName) &&
            <DeleteToggle handleClick={handleDeleteToggle} />
          }
        </NavItem>
      </NavMenuEnd>
    </Nav>;
