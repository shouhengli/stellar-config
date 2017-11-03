const R = require('ramda');
const {connect} = require('react-redux');
const NodeEditor = require('../components/ingestion-profile-mapping-node-editor.jsx');

const {
  MAPPING_NODE_TYPE_KEY,
} = require('../ingestion-profile');

const {
  toggleNewNodeActivePropKey,
  toggleNewNodeActivePropValue,
  addNewNodeProp,
  deleteNewNodeProp,
  setNewNodePropKey,
  setNewNodePropValue,
  resetNewNode,
} = require('../action-creators/ui/ingestion-profile');

const {
  addNewMappingNode,
} = require('../action-creators/ingestion-profile');

const {
  newNodeSelector,
  newNodeActivePropSelector,
  columnOptionsSelector,
  newNodeSaveEnabledSelector,
} = require('../selectors/ui/ingestion-profile');

const {
  newMappingNodePropOptionsSelector,
  classNamesSelector,
  sourcesSelector,
} = require('../selectors/ingestion-profile');

function mapStateToProps(state) {
  return {
    node: newNodeSelector(state),
    activeNodeProp: newNodeActivePropSelector(state),
    nodeTypeOptions: classNamesSelector(state),
    nodePropOptions: newMappingNodePropOptionsSelector(state),
    sourceOptions: sourcesSelector(state),
    columnOptions: columnOptionsSelector(state),
    saveEnabled: newNodeSaveEnabledSelector(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    handleNodePropKeyMenuItemClick: (itemLists, activeItems, depth, item, propKey) =>
      dispatch(setNewNodePropKey(item, propKey)),

    handleNodePropValueMenuItemClick: (itemLists, activeItems, depth, item, propKey) => {
      if (propKey === MAPPING_NODE_TYPE_KEY) {
        dispatch(setNewNodePropValue(propKey, item));
      } else {
        if (depth === 0) {
          dispatch(setNewNodePropValue(
            propKey,
            {
              source: item,
            }
          ));
        } else {
          dispatch(setNewNodePropValue(
            propKey,
            {
              source: activeItems.get(0),
              column: item,
            }
          ));
        }
      }
    },

    handleNodePropKeyButtonClick: R.compose(dispatch, toggleNewNodeActivePropKey),

    handleNodePropValueButtonClick: R.compose(dispatch, toggleNewNodeActivePropValue),

    handleDeleteSectionButtonClick: R.compose(dispatch, deleteNewNodeProp),

    handleAddNodePropButtonClick: R.compose(dispatch, addNewNodeProp),

    handleCancelButtonClick: R.compose(dispatch, resetNewNode),

    handleSaveButtonClick: R.compose(dispatch, addNewMappingNode),
  };
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(NodeEditor);
