const R = require('ramda');
const {connect} = require('react-redux');
const LinkEditor = require('../components/ingestion-profile-mapping-link-editor.jsx');

const {
  MAPPING_LINK_TYPE_KEY,
} = require('../ingestion-profile');

const {
  newLinkSelector,
  newLinkActivePropSelector,
  newLinkColumnOptionsSelector,
  newLinkSaveEnabledSelector,
} = require('../selectors/ui/ingestion-profile');

const {
  classLinkKeysSelector,
  sourcesSelector,
  newMappingLinkPropOptionsSelector,
} = require('../selectors/ingestion-profile');

const {
  toggleNewLinkActivePropKey,
  toggleNewLinkActivePropValue,
  setNewLinkPropValue,
  resetNewLink,
  deleteNewLinkProp,
  addNewLinkProp,
  setNewLinkPropKey,
} = require('../action-creators/ui/ingestion-profile');

const {addNewMappingLink} = require('../action-creators/ingestion-profile');

function mapStateToProps(state) {
  return {
    link: newLinkSelector(state),
    activeLinkProp: newLinkActivePropSelector(state),
    linkTypeOptions: classLinkKeysSelector(state),
    sourceOptions: sourcesSelector(state),
    columnOptions: newLinkColumnOptionsSelector(state),
    linkPropOptions: newMappingLinkPropOptionsSelector(state),
    saveEnabled: newLinkSaveEnabledSelector(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    handleLinkPropKeyMenuItemClick: (itemLists, activeItems, depth, item, propKey) =>
      dispatch(setNewLinkPropKey(item, propKey)),

    handleLinkPropKeyButtonClick: R.compose(dispatch, toggleNewLinkActivePropKey),

    handleLinkPropValueMenuItemClick: (itemLists, activeItems, depth, item, propKey) => {
      if (propKey === MAPPING_LINK_TYPE_KEY) {
        dispatch(setNewLinkPropValue(propKey, item));
      } else {
        if (depth === 0) {
          dispatch(setNewLinkPropValue(
            propKey,
            {
              source: item,
            },
            false
          ));
        } else {
          dispatch(setNewLinkPropValue(
            propKey,
            {
              source: activeItems.get(0),
              column: item,
            }
          ));
        }
      }
    },

    handleLinkPropValueButtonClick: R.compose(dispatch, toggleNewLinkActivePropValue),

    handleCancelButtonClick: R.compose(dispatch, resetNewLink),

    handleDeleteSectionButtonClick: R.compose(dispatch, deleteNewLinkProp),

    handleAddLinkPropButtonClick: R.compose(dispatch, addNewLinkProp),

    handleSaveButtonClick: R.compose(dispatch, addNewMappingLink),
  };
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(LinkEditor);
