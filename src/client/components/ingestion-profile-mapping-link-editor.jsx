const React = require('react');
const R = require('ramda');
const { List } = require('immutable');
const { isNotEmpty } = require('../util');

const ActiveDropDownMenu = require('./active-drop-down-menu.jsx');
const InactiveDropDownMenu = require('./inactive-drop-down-menu.jsx');
const SourceColumnLabel = require('./ingestion-profile-mapping-source-column-label.jsx');
const LinkTypeLabel = require('./ingestion-profile-mapping-link-type-label.jsx');

const DeleteSectionButton = ({ handleClick }) => (
  <a
    className="button is-small is-danger is-outlined delete-section-button"
    onClick={() => handleClick()}>
    Delete
  </a>
);

const PropLabel = ({ label }) =>
  isNotEmpty(label) ? label : <span>(None)</span>;

const LinkTypeItem = ({ item }) => (
  <LinkTypeLabel source={item.get('source')} name={item.get('name')} />
);

const {
  MAPPING_LINK_TYPE_KEY,
  MAPPING_LINK_SOURCE_KEY,
  MAPPING_LINK_DESTINATION_KEY
} = require('../ingestion-profile');

module.exports = ({
  link,
  index,
  activeLinkProp,
  linkTypeOptions,
  sourceOptions,
  columnOptions,
  linkPropOptions,
  saveEnabled,
  handleLinkPropKeyMenuItemClick,
  handleLinkPropKeyButtonClick,
  handleLinkPropValueMenuItemClick,
  handleLinkPropValueButtonClick,
  handleCancelButtonClick,
  handleDeleteSectionButtonClick,
  handleSaveButtonClick,
  handleAddLinkPropButtonClick,
  handleDeleteButtonClick
}) => (
  <div className="card">
    <header className="card-header">
      <p className="card-header-title">
        {link.has(MAPPING_LINK_TYPE_KEY) ? (
          <LinkTypeLabel
            source={link.getIn([MAPPING_LINK_TYPE_KEY, 'source'])}
            name={link.getIn([MAPPING_LINK_TYPE_KEY, 'name'])}
          />
        ) : (
          'New Link'
        )}
      </p>
      <a className="card-header-icon" onClick={() => handleCancelButtonClick()}>
        <span className="icon">
          <i className="fa fa-times" />
        </span>
      </a>
    </header>
    <div className="card-content">
      <div className="field">
        <label className="label">Type</label>
        {R.and(
          activeLinkProp.get('key') === MAPPING_LINK_TYPE_KEY,
          activeLinkProp.get('valueActive')
        ) ? (
          <ActiveDropDownMenu
            itemLists={List.of(linkTypeOptions)}
            activeItems={List.of(link.get(MAPPING_LINK_TYPE_KEY))}
            itemComponents={List.of(LinkTypeItem)}
            handleItemClick={R.partialRight(handleLinkPropValueMenuItemClick, [
              MAPPING_LINK_TYPE_KEY
            ])}
            handleButtonClick={R.partial(handleLinkPropValueButtonClick, [
              MAPPING_LINK_TYPE_KEY
            ])}>
            <LinkTypeLabel
              source={link.getIn([MAPPING_LINK_TYPE_KEY, 'source'])}
              name={link.getIn([MAPPING_LINK_TYPE_KEY, 'name'])}
            />
          </ActiveDropDownMenu>
        ) : (
          <InactiveDropDownMenu
            handleButtonClick={R.partial(handleLinkPropValueButtonClick, [
              MAPPING_LINK_TYPE_KEY
            ])}>
            <LinkTypeLabel
              source={link.getIn([MAPPING_LINK_TYPE_KEY, 'source'])}
              name={link.getIn([MAPPING_LINK_TYPE_KEY, 'name'])}
            />
          </InactiveDropDownMenu>
        )}
      </div>
      <div className="field">
        <label className="label">@ID</label>
        {R.and(
          activeLinkProp.get('key') === MAPPING_LINK_SOURCE_KEY,
          activeLinkProp.get('valueActive')
        ) ? (
          <ActiveDropDownMenu
            itemLists={List.of(sourceOptions, columnOptions)}
            activeItems={List.of(
              link.getIn([MAPPING_LINK_SOURCE_KEY, 'source']),
              link.getIn([MAPPING_LINK_SOURCE_KEY, 'column'])
            )}
            handleItemClick={R.partialRight(handleLinkPropValueMenuItemClick, [
              MAPPING_LINK_SOURCE_KEY,
              link.get(MAPPING_LINK_SOURCE_KEY)
            ])}
            handleButtonClick={R.partial(handleLinkPropValueButtonClick, [
              MAPPING_LINK_SOURCE_KEY
            ])}>
            <SourceColumnLabel
              source={link.getIn([MAPPING_LINK_SOURCE_KEY, 'source'])}
              column={link.getIn([MAPPING_LINK_SOURCE_KEY, 'column'])}
            />
          </ActiveDropDownMenu>
        ) : (
          <InactiveDropDownMenu
            handleButtonClick={R.partial(handleLinkPropValueButtonClick, [
              MAPPING_LINK_SOURCE_KEY
            ])}>
            <SourceColumnLabel
              source={link.getIn([MAPPING_LINK_SOURCE_KEY, 'source'])}
              column={link.getIn([MAPPING_LINK_SOURCE_KEY, 'column'])}
            />
          </InactiveDropDownMenu>
        )}
      </div>
      <div className="field">
        <label className="label">@ID</label>
        {R.and(
          activeLinkProp.get('key') === MAPPING_LINK_DESTINATION_KEY,
          activeLinkProp.get('valueActive')
        ) ? (
          <ActiveDropDownMenu
            itemLists={List.of(sourceOptions, columnOptions)}
            activeItems={List.of(
              link.getIn([MAPPING_LINK_DESTINATION_KEY, 'source']),
              link.getIn([MAPPING_LINK_DESTINATION_KEY, 'column'])
            )}
            handleItemClick={R.partialRight(handleLinkPropValueMenuItemClick, [
              MAPPING_LINK_DESTINATION_KEY,
              link.get(MAPPING_LINK_DESTINATION_KEY)
            ])}
            handleButtonClick={R.partial(handleLinkPropValueButtonClick, [
              MAPPING_LINK_DESTINATION_KEY
            ])}>
            <SourceColumnLabel
              source={link.getIn([MAPPING_LINK_DESTINATION_KEY, 'source'])}
              column={link.getIn([MAPPING_LINK_DESTINATION_KEY, 'column'])}
            />
          </ActiveDropDownMenu>
        ) : (
          <InactiveDropDownMenu
            handleButtonClick={R.partial(handleLinkPropValueButtonClick, [
              MAPPING_LINK_DESTINATION_KEY
            ])}>
            <SourceColumnLabel
              source={link.getIn([MAPPING_LINK_DESTINATION_KEY, 'source'])}
              column={link.getIn([MAPPING_LINK_DESTINATION_KEY, 'column'])}
            />
          </InactiveDropDownMenu>
        )}
      </div>
      {link
        .filterNot(
          (_, propKey) =>
            propKey === MAPPING_LINK_TYPE_KEY ||
            propKey === MAPPING_LINK_SOURCE_KEY ||
            propKey === MAPPING_LINK_DESTINATION_KEY
        )
        .map((propValue, propKey) => (
          <div key={propKey}>
            <hr />
            <DeleteSectionButton
              handleClick={R.partial(handleDeleteSectionButtonClick, [propKey])}
            />
            <div className="field">
              <label className="label">Property</label>
              {R.and(
                activeLinkProp.get('key') === propKey,
                !activeLinkProp.get('valueActive')
              ) ? (
                <ActiveDropDownMenu
                  itemLists={List.of(linkPropOptions)}
                  activeItems={List.of(propKey)}
                  handleItemClick={R.partialRight(
                    handleLinkPropKeyMenuItemClick,
                    [propKey]
                  )}
                  handleButtonClick={R.partial(handleLinkPropKeyButtonClick, [
                    propKey
                  ])}>
                  <PropLabel label={propKey} />
                </ActiveDropDownMenu>
              ) : (
                <InactiveDropDownMenu
                  handleButtonClick={R.partial(handleLinkPropKeyButtonClick, [
                    propKey
                  ])}>
                  <PropLabel label={propKey} />
                </InactiveDropDownMenu>
              )}
            </div>
            <div className="field">
              <label className="label">Column</label>
              {R.and(
                activeLinkProp.get('key') === propKey,
                activeLinkProp.get('valueActive')
              ) ? (
                <ActiveDropDownMenu
                  itemLists={List.of(sourceOptions, columnOptions)}
                  activeItems={List.of(
                    propValue.get('source'),
                    propValue.get('column')
                  )}
                  handleItemClick={R.partialRight(
                    handleLinkPropValueMenuItemClick,
                    [propKey]
                  )}
                  handleButtonClick={R.partial(handleLinkPropValueButtonClick, [
                    propKey
                  ])}>
                  <SourceColumnLabel
                    source={propValue.get('source')}
                    column={propValue.get('column')}
                  />
                </ActiveDropDownMenu>
              ) : (
                <InactiveDropDownMenu
                  handleButtonClick={R.partial(handleLinkPropValueButtonClick, [
                    propKey
                  ])}>
                  <SourceColumnLabel
                    source={propValue.get('source')}
                    column={propValue.get('column')}
                  />
                </InactiveDropDownMenu>
              )}
            </div>
          </div>
        ))
        .valueSeq()}
    </div>
    <footer className="card-footer">
      {index >= 0 && (
        <a
          className="card-footer-item has-text-danger"
          onClick={() => handleDeleteButtonClick(index)}>
          Delete
        </a>
      )}
      <a
        className="card-footer-item"
        onClick={() => handleAddLinkPropButtonClick()}>
        Add
      </a>
      {saveEnabled ? (
        <a
          className="card-footer-item"
          onClick={() => handleSaveButtonClick(link, index)}>
          Done
        </a>
      ) : (
        <span className="card-footer-item">Done</span>
      )}
    </footer>
  </div>
);
