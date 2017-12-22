import React from 'react';
import Nav from './nav.jsx';
import NavItem from './nav-item.jsx';
import NavMenuStart from './nav-menu-start.jsx';
import NavMenuEnd from './nav-menu-end.jsx';
import NavDropDown from './nav-drop-down.jsx';
import Header from './ingestion-profile-header.jsx';
import Save from './config-save.jsx';
import SearchToggle from './config-search-toggle.jsx';
import NewToggle from './config-new-toggle.jsx';
import DeleteToggle from './config-delete-toggle.jsx';
import ModalPopUp from './modal-pop-up.jsx';
import { isNotEmpty } from '../util';

module.exports = ({
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
  Delete
}) => {
  let elements = [
    <Nav key="nav">
      <NavMenuStart>
        <NavDropDown
          label="Ingestion Profile"
          items={['Ingestion Profile', 'Monitor']}
        />
      </NavMenuStart>
      <NavMenuEnd>
        {isNotEmpty(name) && (
          <Header
            name={name}
            activeTab={activeTab}
            handleTabClick={handleTabClick}
          />
        )}
        <NavItem>
          <div className="buttons has-addons">
            <Save
              name={name}
              status={status}
              content={content}
              handleClick={handleSaveClick}
            />
            <SearchToggle handleClick={handleSearchToggleClick} />
            <NewToggle handleClick={handleNewToggleClick} />
            {isNotEmpty(name) && (
              <DeleteToggle handleClick={handleDeleteToggleClick} />
            )}
          </div>
        </NavItem>
      </NavMenuEnd>
    </Nav>
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
