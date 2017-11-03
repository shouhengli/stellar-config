const React = require('react');
const R = require('ramda');
const {List} = require('immutable');

const ActiveDropDownMenu = require('./active-drop-down-menu.jsx');
const InactiveDropDownMenu = require('./inactive-drop-down-menu.jsx');

const {
  MAPPING_LINK_TYPE_KEY,
} = require('../ingestion-profile');

const TypeLabel = ({type}) =>
  R.isNil(type)
    ? <span>(None)</span>
    : [
      <span key="class">
        {type.get('source')}
      </span>,
      <span key="class-icon" className="icon">
        <i className="fa fa-caret-right"></i>
      </span>,
      <span key="link">
        {type.get('name')}
      </span>,
    ];

const TypeItem = ({item}) => <TypeLabel type={item} />;

module.exports =
  ({
    link,
    activeLinkProp,
    linkTypeOptions,
    handleLinkPropValueMenuItemClick,
    handleLinkPropValueButtonClick,
    handleCancelButtonClick,
  }) =>
    <div className="card">
      <header className="card-header">
        <p className="card-header-title">
          New Link
        </p>
        <a className="card-header-icon" onClick={() => handleCancelButtonClick()}>
          <span className="icon">
            <i className="fa fa-times"></i>
          </span>
        </a>
      </header>
      <div className="card-content">
        <div className="field">
          <label className="label">Type</label>
          {
            R.and(
              activeLinkProp.get('key') === MAPPING_LINK_TYPE_KEY,
              activeLinkProp.get('valueActive')
            )
            ? (
              <ActiveDropDownMenu
                itemLists={List.of(linkTypeOptions)}
                activeItems={List.of(link.get(MAPPING_LINK_TYPE_KEY))}
                itemComponents={List.of(TypeItem)}
                handleItemClick={
                  R.partialRight(
                    handleLinkPropValueMenuItemClick,
                    [MAPPING_LINK_TYPE_KEY]
                  )
                }
                handleButtonClick={
                  R.partial(
                    handleLinkPropValueButtonClick,
                    [MAPPING_LINK_TYPE_KEY]
                  )
                }>
                <TypeLabel type={link.get(MAPPING_LINK_TYPE_KEY)} />
              </ActiveDropDownMenu>
            )
            : (
              <InactiveDropDownMenu
                handleButtonClick={
                  R.partial(
                    handleLinkPropValueButtonClick,
                    [MAPPING_LINK_TYPE_KEY]
                  )
                }>
                <TypeLabel type={link.get(MAPPING_LINK_TYPE_KEY)} />
              </InactiveDropDownMenu>
            )
          }
        </div>
      </div>
    </div>;
