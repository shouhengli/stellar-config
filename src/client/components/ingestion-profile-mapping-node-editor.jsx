const React = require('react');
const R = require('ramda');
const { List } = require('immutable');

const ActiveDropDownMenu = require('./active-drop-down-menu.jsx');
const InactiveDropDownMenu = require('./inactive-drop-down-menu.jsx');
const SourceColumnLabel = require('./ingestion-profile-mapping-source-column-label.jsx');

const { isNotEmpty } = require('../util');

const {
  MAPPING_NODE_ID_KEY,
  MAPPING_NODE_TYPE_KEY
} = require('../ingestion-profile');

const DeleteSectionButton = ({ handleClick }) => (
  <a
    className="button is-small is-danger is-outlined delete-section-button"
    onClick={() => handleClick()}>
    Delete
  </a>
);

const PropLabel = ({ label }) =>
  isNotEmpty(label) ? label : <span>(None)</span>;

module.exports = ({
  node,
  index,
  activeNodeProp,
  nodeTypeOptions,
  nodePropOptions,
  sourceOptions,
  columnOptions,
  saveEnabled,
  handleNodePropKeyMenuItemClick,
  handleNodePropKeyButtonClick,
  handleNodePropValueMenuItemClick,
  handleNodePropValueButtonClick,
  handleDeleteSectionButtonClick,
  handleAddNodePropButtonClick,
  handleCancelButtonClick,
  handleDeleteButtonClick,
  handleSaveButtonClick
}) => (
  <div className="card">
    <header className="card-header">
      <p className="card-header-title">
        {node.get(MAPPING_NODE_TYPE_KEY, 'New Node')}
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
          activeNodeProp.get('key') === MAPPING_NODE_TYPE_KEY,
          activeNodeProp.get('valueActive')
        ) ? (
          <ActiveDropDownMenu
            itemLists={List.of(nodeTypeOptions)}
            activeItems={List.of(node.get(MAPPING_NODE_TYPE_KEY))}
            handleItemClick={R.partialRight(handleNodePropValueMenuItemClick, [
              MAPPING_NODE_TYPE_KEY
            ])}
            handleButtonClick={R.partial(handleNodePropValueButtonClick, [
              MAPPING_NODE_TYPE_KEY
            ])}>
            <PropLabel label={node.get(MAPPING_NODE_TYPE_KEY)} />
          </ActiveDropDownMenu>
        ) : (
          <InactiveDropDownMenu
            handleButtonClick={R.partial(handleNodePropValueButtonClick, [
              MAPPING_NODE_TYPE_KEY
            ])}>
            <PropLabel label={node.get(MAPPING_NODE_TYPE_KEY)} />
          </InactiveDropDownMenu>
        )}
      </div>
      <div className="field">
        <label className="label">@ID</label>
        {R.and(
          activeNodeProp.get('key') === MAPPING_NODE_ID_KEY,
          activeNodeProp.get('valueActive')
        ) ? (
          <ActiveDropDownMenu
            itemLists={List.of(sourceOptions, columnOptions)}
            activeItems={List.of(
              node.getIn([MAPPING_NODE_ID_KEY, 'source']),
              node.getIn([MAPPING_NODE_ID_KEY, 'column'])
            )}
            handleItemClick={R.partialRight(handleNodePropValueMenuItemClick, [
              MAPPING_NODE_ID_KEY,
              node.get(MAPPING_NODE_ID_KEY)
            ])}
            handleButtonClick={R.partial(handleNodePropValueButtonClick, [
              MAPPING_NODE_ID_KEY
            ])}>
            <SourceColumnLabel
              source={node.getIn([MAPPING_NODE_ID_KEY, 'source'])}
              column={node.getIn([MAPPING_NODE_ID_KEY, 'column'])}
            />
          </ActiveDropDownMenu>
        ) : (
          <InactiveDropDownMenu
            handleButtonClick={R.partial(handleNodePropValueButtonClick, [
              MAPPING_NODE_ID_KEY
            ])}>
            <SourceColumnLabel
              source={node.getIn([MAPPING_NODE_ID_KEY, 'source'])}
              column={node.getIn([MAPPING_NODE_ID_KEY, 'column'])}
            />
          </InactiveDropDownMenu>
        )}
      </div>
      {node
        .filterNot(
          (_, propKey) =>
            propKey === MAPPING_NODE_ID_KEY || propKey === MAPPING_NODE_TYPE_KEY
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
                activeNodeProp.get('key') === propKey,
                !activeNodeProp.get('valueActive')
              ) ? (
                <ActiveDropDownMenu
                  itemLists={List.of(nodePropOptions)}
                  activeItems={List.of(propKey)}
                  handleItemClick={R.partialRight(
                    handleNodePropKeyMenuItemClick,
                    [propKey]
                  )}
                  handleButtonClick={R.partial(handleNodePropKeyButtonClick, [
                    propKey
                  ])}>
                  <PropLabel label={propKey} />
                </ActiveDropDownMenu>
              ) : (
                <InactiveDropDownMenu
                  handleButtonClick={R.partial(handleNodePropKeyButtonClick, [
                    propKey
                  ])}>
                  <PropLabel label={propKey} />
                </InactiveDropDownMenu>
              )}
            </div>
            <div className="field">
              <label className="label">Column</label>
              {R.and(
                activeNodeProp.get('key') === propKey,
                activeNodeProp.get('valueActive')
              ) ? (
                <ActiveDropDownMenu
                  itemLists={List.of(sourceOptions, columnOptions)}
                  activeItems={List.of(
                    propValue.get('source'),
                    propValue.get('column')
                  )}
                  handleItemClick={R.partialRight(
                    handleNodePropValueMenuItemClick,
                    [propKey]
                  )}
                  handleButtonClick={R.partial(handleNodePropValueButtonClick, [
                    propKey
                  ])}>
                  <SourceColumnLabel
                    source={propValue.get('source')}
                    column={propValue.get('column')}
                  />
                </ActiveDropDownMenu>
              ) : (
                <InactiveDropDownMenu
                  handleButtonClick={R.partial(handleNodePropValueButtonClick, [
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
        onClick={() => handleAddNodePropButtonClick()}>
        Add
      </a>
      {saveEnabled ? (
        <a
          className="card-footer-item"
          onClick={() => handleSaveButtonClick(node, index)}>
          Done
        </a>
      ) : (
        <span className="card-footer-item">Done</span>
      )}
    </footer>
  </div>
);
