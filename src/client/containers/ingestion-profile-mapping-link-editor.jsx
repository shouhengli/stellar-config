const R = require('ramda');
const { connect } = require('react-redux');
const LinkEditor = require('../components/ingestion-profile-mapping-link-editor.jsx');

const { MAPPING_LINK_TYPE_KEY } = require('../ingestion-profile');

const {
  mappingLinkSelector,
  editingLinkIndexSelector,
  mappingLinkActivePropSelector,
  mappingLinkColumnOptionsSelector,
  mappingLinkSaveEnabledSelector
} = require('../selectors/ui/ingestion-profile');

const {
  classLinkKeysSelector,
  sourcesSelector,
  mappingLinkPropOptionsSelector
} = require('../selectors/ingestion-profile');

const {
  toggleMappingLinkActivePropKey,
  toggleMappingLinkActivePropValue,
  setMappingLinkPropValue,
  resetMappingLink,
  deleteMappingLinkProp,
  addMappingLinkProp,
  setMappingLinkPropKey
} = require('../action-creators/ui/ingestion-profile');

const {
  addMappingLink,
  updateMappingLink,
  deleteMappingLink
} = require('../action-creators/ingestion-profile');

function mapStateToProps(state) {
  return {
    link: mappingLinkSelector(state),
    index: editingLinkIndexSelector(state),
    activeLinkProp: mappingLinkActivePropSelector(state),
    linkTypeOptions: classLinkKeysSelector(state),
    sourceOptions: sourcesSelector(state),
    columnOptions: mappingLinkColumnOptionsSelector(state),
    linkPropOptions: mappingLinkPropOptionsSelector(state),
    saveEnabled: mappingLinkSaveEnabledSelector(state)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    handleLinkPropKeyMenuItemClick: (
      itemLists,
      activeItems,
      depth,
      item,
      propKey
    ) => dispatch(setMappingLinkPropKey(item, propKey)),

    handleLinkPropKeyButtonClick: R.compose(
      dispatch,
      toggleMappingLinkActivePropKey
    ),

    handleLinkPropValueMenuItemClick: (
      itemLists,
      activeItems,
      depth,
      item,
      propKey
    ) => {
      if (propKey === MAPPING_LINK_TYPE_KEY) {
        dispatch(setMappingLinkPropValue(propKey, item));
      } else {
        if (depth === 0) {
          dispatch(
            setMappingLinkPropValue(
              propKey,
              {
                source: item
              },
              false
            )
          );
        } else {
          dispatch(
            setMappingLinkPropValue(propKey, {
              source: activeItems.get(0),
              column: item
            })
          );
        }
      }
    },

    handleLinkPropValueButtonClick: R.compose(
      dispatch,
      toggleMappingLinkActivePropValue
    ),

    handleCancelButtonClick: R.compose(dispatch, resetMappingLink),

    handleDeleteSectionButtonClick: R.compose(dispatch, deleteMappingLinkProp),

    handleAddLinkPropButtonClick: R.compose(dispatch, addMappingLinkProp),

    handleSaveButtonClick: (link, index) => {
      if (index >= 0) {
        dispatch(updateMappingLink(link, index));
      } else {
        dispatch(addMappingLink(link));
      }
    },

    handleDeleteButtonClick: R.compose(dispatch, deleteMappingLink)
  };
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(LinkEditor);
