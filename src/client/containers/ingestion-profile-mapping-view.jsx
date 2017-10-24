const R = require('ramda');
const {connect} = require('react-redux');
const MappingView = require('../components/ingestion-profile-mapping-view.jsx');

const {
  newNodeVisibleSelector,
  newLinkVisibleSelector,
} = require('../selectors/ui/ingestion-profile');

const {
  revealNewNode,
  revealNewLink,
} = require('../action-creators/ui/ingestion-profile');

function mapStateToProps(state) {
  return {
    newNodeVisible: newNodeVisibleSelector(state),
    newLinkVisible: newLinkVisibleSelector(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    handleAddNodeButtonClick: R.compose(dispatch, revealNewNode),

    handleAddLinkButtonClick: R.compose(dispatch, revealNewLink),
  };
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(MappingView);
