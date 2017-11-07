const R = require('ramda');
const {connect} = require('react-redux');
const NodeEditor = require('../components/ingestion-profile-mapping-node-editor.jsx');

const {
  MAPPING_NODE_TYPE_KEY,
} = require('../ingestion-profile');

const {
  toggleMappingNodeActivePropKey,
  toggleMappingNodeActivePropValue,
  addMappingNodeProp,
  deleteMappingNodeProp,
  setMappingNodePropKey,
  setMappingNodePropValue,
  resetMappingNode,
} = require('../action-creators/ui/ingestion-profile');

const {
  addMappingNode,
  updateMappingNode,
  deleteMappingNode,
} = require('../action-creators/ingestion-profile');

const {
  mappingNodeSelector,
  editingNodeIndexSelector,
  mappingNodeActivePropSelector,
  mappingNodeColumnOptionsSelector,
  mappingNodeSaveEnabledSelector,
} = require('../selectors/ui/ingestion-profile');

const {
  mappingNodePropOptionsSelector,
  classNamesSelector,
  sourcesSelector,
} = require('../selectors/ingestion-profile');

function mapStateToProps(state) {
  return {
    node: mappingNodeSelector(state),
    index: editingNodeIndexSelector(state),
    activeNodeProp: mappingNodeActivePropSelector(state),
    nodeTypeOptions: classNamesSelector(state),
    nodePropOptions: mappingNodePropOptionsSelector(state),
    sourceOptions: sourcesSelector(state),
    columnOptions: mappingNodeColumnOptionsSelector(state),
    saveEnabled: mappingNodeSaveEnabledSelector(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    handleNodePropKeyMenuItemClick: (itemLists, activeItems, depth, item, propKey) =>
      dispatch(setMappingNodePropKey(item, propKey)),

    handleNodePropValueMenuItemClick: (itemLists, activeItems, depth, item, propKey) => {
      if (propKey === MAPPING_NODE_TYPE_KEY) {
        dispatch(setMappingNodePropValue(propKey, item));
      } else {
        if (depth === 0) {
          dispatch(setMappingNodePropValue(
            propKey,
            {
              source: item,
            },
            false
          ));
        } else {
          dispatch(setMappingNodePropValue(
            propKey,
            {
              source: activeItems.get(0),
              column: item,
            }
          ));
        }
      }
    },

    handleNodePropKeyButtonClick: R.compose(dispatch, toggleMappingNodeActivePropKey),

    handleNodePropValueButtonClick: R.compose(dispatch, toggleMappingNodeActivePropValue),

    handleDeleteSectionButtonClick: R.compose(dispatch, deleteMappingNodeProp),

    handleAddNodePropButtonClick: R.compose(dispatch, addMappingNodeProp),

    handleCancelButtonClick: R.compose(dispatch, resetMappingNode),

    handleSaveButtonClick: (node, index) => {
      if (index >= 0) {
        dispatch(updateMappingNode(node, index));
      } else {
        dispatch(addMappingNode(node));
      }
    },

    handleDeleteButtonClick: R.compose(dispatch, deleteMappingNode),
  };
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(NodeEditor);
