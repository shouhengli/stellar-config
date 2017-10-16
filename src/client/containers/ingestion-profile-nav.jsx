const React = require('react');
const R = require('ramda');
const {connect} = require('react-redux');
const Nav = require('../components/ingestion-profile-nav.jsx');
const Search = require('./config-search.jsx');

const {
  saveAsync,
  revealNewConfig,
  revealDeleteConfig,
} = require('../action-creators/ingestion-profile');

const {revealSearch} = require('../action-creators/search');

const {
  nameSelector,
  sourcesSelector,
  statusSelector,
  persistentIngestionProfileSelector,
} = require('../selectors/ingestion-profile');

const {
  visibleSelector: searchVisibleSelector,
} = require('../selectors/ui/search');

const resolveConfigContent = (state) => () => {
  const sources = sourcesSelector(state);
  const graphSchema = persistentIngestionProfileSelector(state);

  return {
    sources,
    graphSchema,
  };
};

function mapStateToProps(state) {
  return {
    configName: nameSelector(state),
    resolveConfigContent: resolveConfigContent(state),
    configStatus: statusSelector(state),
    searchVisible: searchVisibleSelector(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    handleSaveClick: R.compose(dispatch, saveAsync),

    handleSearchToggleClick: R.compose(dispatch, revealSearch),

    handleNewToggle: R.compose(dispatch, revealNewConfig),

    handleDeleteToggle: R.compose(dispatch, revealDeleteConfig),
  };
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(
  (props) => <Nav Search={Search} {...props} />
);
