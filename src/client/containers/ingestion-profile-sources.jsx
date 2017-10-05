const R = require('ramda');
const P = require('bluebird');
const {List} = require('immutable');
const {connect} = require('react-redux');
const Sources = require('../components/ingestion-profile-sources.jsx');

const {
  setSelectedSource,
  setNewSource,
  loadSample,
  loadSampleAsync,
  revealSourceDelete,
} = require('../action-creators/ingestion-profile');

const {setEditConfigContent} = require('../action-creators/edit');

const defaultToEmptyList = R.defaultTo(List());

function mapStateToProps(state) {
  const configContent = state.getIn(['edit', 'content']);
  const ingestionProfile = state.get('ingestionProfile');
  const newSource = ingestionProfile.get('newSource');

  let selectedSource = ingestionProfile.get('selectedSource');

  return {
    configContent,
    selectedSource,
    newSource,
  };
}

function mapDispatchToProps(dispatch) {
  const handleSourceChange = (selectedSource) => P
    .try(R.compose(dispatch, setSelectedSource, R.always(selectedSource)))
    .then(() =>
      R.ifElse(
        R.isEmpty,
        R.compose(dispatch, loadSample, R.always(null)),
        R.compose(dispatch, loadSampleAsync)
      )(selectedSource)
    );

  const handleNewSourceChange = R.compose(dispatch, setNewSource);

  const handleAddNewSource = (configContent, newSource) => P
    .try(R.compose(
      dispatch,
      setEditConfigContent,
      () => configContent.set(
        'sources',
        defaultToEmptyList(configContent.get('sources')).push(newSource)
      )
    ))
    .then(R.compose(
      handleSourceChange,
      R.always(newSource)
    ))
    .then(R.compose(
      dispatch,
      setNewSource,
      R.always('')
    ));

  const handleDeleteSource = R.compose(dispatch, revealSourceDelete);

  return {
    handleSourceChange,
    handleNewSourceChange,
    handleAddNewSource,
    handleDeleteSource,
  };
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(Sources);
