const {connect} = require('react-redux');
const Nav = require('../components/ingestion-profile-nav.jsx');

const {
  saveAsync,
  revealNewConfig,
  revealConfigDelete,
} = require('../action-creators/ingestion-profile');
const {revealSearch} = require('../action-creators/search');

const {
  nameSelector,
  sourcesSelector,
  statusSelector,
} = require('../selectors/ingestion-profile');

const {
  persistentIngestionProfileSelector,
} = require('../selectors/ingestion-profile');

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
  };
}

function mapDispatchToProps(dispatch) {
  return {
    handleSaveClick: (configName, configContent) =>
      dispatch(saveAsync(configName, configContent)),

    handleSearchToggleClick: () => dispatch(revealSearch()),

    handleNewToggle: () => dispatch(revealNewConfig()),

    handleDeleteToggle: () => dispatch(revealConfigDelete()),
  };
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(Nav);
