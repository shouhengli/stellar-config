const R = require('ramda');
const {List} = require('immutable');
const {connect} = require('react-redux');
const Sources = require('../components/ingestion-profile-sources.jsx');
const {setSelectedSource, setNewSource} = require('../action-creators/ingestion-profile');
const {setEditConfigContent} = require('../action-creators/edit');

const defaultToEmptyList = R.defaultTo(List());

function mapStateToProps(state) {
  const configContent = state.getIn(['edit', 'content']);
  const ingestionProfile = state.get('ingestionProfile');
  const newSource = ingestionProfile.get('newSource');

  let selectedSource = ingestionProfile.get('selectedSource');
  const sources = configContent.get('sources');
  if (sources) {
    selectedSource = sources.indexOf(selectedSource) >= 0
                   ? selectedSource
                   : sources.first();
  }

  return {
    configContent,
    selectedSource,
    newSource,
  };
}

function mapDispatchToProps(dispatch) {
  const handleSourceChange = R.compose(dispatch, setSelectedSource);
  const handleNewSourceChange = R.compose(dispatch, setNewSource);

  const handleAddNewSource = R.compose(
    dispatch,
    setEditConfigContent,
    (configContent, newSource) =>
      configContent.set('sources', defaultToEmptyList(configContent.get('sources')).push(newSource))
  );

  return {
    handleSourceChange,
    handleNewSourceChange,
    handleAddNewSource,
  };
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(Sources);
