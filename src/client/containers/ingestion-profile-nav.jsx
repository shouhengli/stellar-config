const React = require('react');
const R = require('ramda');
const { connect } = require('react-redux');
const Nav = require('../components/ingestion-profile-nav.jsx');
const Search = require('./config-search.jsx');
const New = require('./config-new.jsx');
const Delete = require('./config-delete.jsx');

const { saveAsync } = require('../action-creators/ingestion-profile');

const {
  revealNew,
  revealDelete,
  setActiveTab
} = require('../action-creators/ui/ingestion-profile');

const { revealSearch } = require('../action-creators/ui/search');

const {
  nameSelector,
  statusSelector,
  persistentIngestionProfileSelector
} = require('../selectors/ingestion-profile');

const {
  visibleSelector: searchVisibleSelector
} = require('../selectors/ui/search');

const {
  newVisibleSelector,
  deleteVisibleSelector,
  activeTabSelector
} = require('../selectors/ui/ingestion-profile');

function mapStateToProps(state) {
  return {
    name: nameSelector(state),
    content: persistentIngestionProfileSelector(state),
    status: statusSelector(state),
    searchVisible: searchVisibleSelector(state),
    newVisible: newVisibleSelector(state),
    deleteVisible: deleteVisibleSelector(state),
    activeTab: activeTabSelector(state)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    handleSaveClick: R.compose(dispatch, saveAsync),

    handleSearchToggleClick: R.compose(dispatch, revealSearch),

    handleNewToggleClick: R.compose(dispatch, revealNew),

    handleDeleteToggleClick: R.compose(dispatch, revealDelete),

    handleTabClick: R.compose(dispatch, setActiveTab)
  };
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(props => (
  <Nav Search={Search} New={New} Delete={Delete} {...props} />
));
