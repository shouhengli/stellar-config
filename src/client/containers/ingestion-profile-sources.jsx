const React = require('react');
const R = require('ramda');
const {connect} = require('react-redux');
const Sources = require('../components/ingestion-profile-sources.jsx');
const NewSource = require('./ingestion-profile-new-source.jsx');

const {
  setSelectedSource,
  loadSample,
  loadSampleAsync,
  revealSourceDelete,
  revealNewSource,
} = require('../action-creators/ingestion-profile');

function mapStateToProps(state) {
  const configContent = state.getIn(['edit', 'content']);
  const ingestionProfile = state.get('ingestionProfile');
  const selectedSource = ingestionProfile.get('selectedSource');
  const newSourceVisible = ingestionProfile.get('newSourceVisible');

  return {
    configContent,
    selectedSource,
    newSourceVisible,
  };
}

function mapDispatchToProps(dispatch) {
  const handleSourceChange = R.compose(dispatch, setSelectedSource);

  const handleSourceDidChange = R.ifElse(
    R.isEmpty,
    R.compose(dispatch, loadSample, R.always(null)),
    R.compose(dispatch, loadSampleAsync)
  );

  const handleDeleteSource = R.compose(dispatch, revealSourceDelete);

  const handleRevealNewSource = R.compose(dispatch, revealNewSource);

  return {
    handleSourceChange,
    handleSourceDidChange,
    handleDeleteSource,
    handleRevealNewSource,
  };
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(
  (props) => <Sources NewSource={NewSource} {...props} />
);
