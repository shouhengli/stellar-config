const React = require('react');
const R = require('ramda');
const { connect } = require('react-redux');
const MappingView = require('../components/ingestion-profile-mapping-view.jsx');
const NodeEditor = require('./ingestion-profile-mapping-node-editor.jsx');
const LinkEditor = require('./ingestion-profile-mapping-link-editor.jsx');

const {
  newNodeVisibleSelector,
  newLinkVisibleSelector,
  editingNodeIndexSelector,
  editingLinkIndexSelector
} = require('../selectors/ui/ingestion-profile');

const {
  mappingNodesSelector,
  mappingLinksSelector
} = require('../selectors/ingestion-profile');

const {
  revealNewNode,
  revealNewLink,
  editMappingNode,
  editMappingLink
} = require('../action-creators/ui/ingestion-profile');

function mapStateToProps(state) {
  return {
    nodes: mappingNodesSelector(state),
    links: mappingLinksSelector(state),
    newNodeVisible: newNodeVisibleSelector(state),
    newLinkVisible: newLinkVisibleSelector(state),
    editingNodeIndex: editingNodeIndexSelector(state),
    editingLinkIndex: editingLinkIndexSelector(state)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    handleAddNodeButtonClick: R.compose(dispatch, revealNewNode),

    handleAddLinkButtonClick: R.compose(dispatch, revealNewLink),

    handleEditNodeButtonClick: R.compose(dispatch, editMappingNode),

    handleEditLinkButtonClick: R.compose(dispatch, editMappingLink)
  };
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(props => (
  <MappingView NodeEditor={NodeEditor} LinkEditor={LinkEditor} {...props} />
));
