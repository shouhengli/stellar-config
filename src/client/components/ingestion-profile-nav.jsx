const React = require('react');

const Nav = require('./nav.jsx');
const NavItem = require('./nav-item.jsx');
const NavMenuStart = require('./nav-menu-start.jsx');
const NavMenuEnd = require('./nav-menu-end.jsx');
const NavDropDown = require('./nav-drop-down.jsx');
const Header = require('./ingestion-profile-header.jsx');
const Save = require('./config-save.jsx');
const SearchToggle = require('./config-search-toggle.jsx');
const NewToggle = require('./config-new-toggle.jsx');
const DeleteToggle = require('./config-delete-toggle.jsx');
const ModalPopUp = require('./modal-pop-up.jsx');

const {isNotEmpty} = require('../util');

module.exports =
  ({
    name,
    status,
    content,
    searchVisible,
    newVisible,
    deleteVisible,
    activeTab,
    handleTabClick,
    handleSaveClick,
    handleSearchToggleClick,
    handleNewToggleClick,
    handleDeleteToggleClick,
    Search,
    New,
    Delete,
  }) => {
    let elements = [
      <Nav key="nav">
        <NavMenuStart>
          <NavDropDown
            label="Ingestion Profile"
            items={['Ingestion Profile', 'Monitor']} />
        </NavMenuStart>
        <NavMenuEnd>
          {
            isNotEmpty(name) &&
            <Header
              name={name}
              activeTab={activeTab}
              handleTabClick={handleTabClick} />
          }
          <NavItem>
            <Save
              name={name}
              status={status}
              content={content}
              handleClick={handleSaveClick} />
            <SearchToggle handleClick={handleSearchToggleClick} />
            <NewToggle handleClick={handleNewToggleClick} />
            {
              isNotEmpty(name) &&
              <DeleteToggle handleClick={handleDeleteToggleClick} />
            }
          </NavItem>
        </NavMenuEnd>
      </Nav>,
    ];

    if (searchVisible) {
      elements.push(
        <ModalPopUp key="search">
          <Search />
        </ModalPopUp>
      );
    }

    if (newVisible) {
      elements.push(
        <ModalPopUp key="new">
          <New />
        </ModalPopUp>
      );
    }

    if (deleteVisible) {
      elements.push(
        <ModalPopUp key="delete">
          <Delete />
        </ModalPopUp>
      );
    }

    return elements;
  };
