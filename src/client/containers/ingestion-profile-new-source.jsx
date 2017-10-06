const P = require('bluebird');
const R = require('ramda');
const {List} = require('immutable');
const {connect} = require('react-redux');
const {setEditConfigContent} = require('../action-creators/edit');
const defaultToEmptyList = R.defaultTo(List());
const NewSource = require('../components/ingestion-profile-new-source.jsx');

const {
  setSelectedSource,
  setNewSource,
  hideNewSource,
} = require('../action-creators/ingestion-profile');

function mapStateToProps(state) {
  const ingestionProfile = state.get('ingestionProfile');
  const newSource = ingestionProfile.get('newSource');

  return {
    newSource,
  };
}

function mapDispatchToProps(dispatch) {
  const handleNewSourceChange = R.compose(dispatch, setNewSource);
  const handleHideNewSource = () => P
    .try(R.compose(
      dispatch,
      setNewSource,
      R.always('')
    ))
    .then(R.compose(dispatch, hideNewSource));

  const handleAddNewSource = (configContent, newSource) => P
    .try(R.compose(
      dispatch,
      setEditConfigContent,
      () => configContent.set(
        'sources',
        defaultToEmptyList(configContent.get('sources')).push(newSource)
      )
    ))
    .then(R.compose(dispatch, setSelectedSource, R.always(newSource)))
    .then(handleHideNewSource);

  return {
    handleNewSourceChange,
    handleHideNewSource,
    handleAddNewSource,
  };
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(NewSource);
