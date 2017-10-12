const P = require('bluebird');
const R = require('ramda');
const {connect} = require('react-redux');
const SourceDelete = require('../components/ingestion-profile-source-delete.jsx');
const {defaultToEmptyList} = require('../util');
const {setEditConfigContent} = require('../action-creators/ingestion-profile');

const {
  setSelectedSource,
  hideSourceDelete,
} = require('../action-creators/ingestion-profile');

function mapStateToProps(state) {
  const selectedSource = state.getIn(['ingestionProfile', 'selectedSource']);
  const configContent = state.getIn(['edit', 'content']);

  return {
    selectedSource,
    configContent,
  };
}

function mapDispatchToProps(dispatch) {
  const handleCloseButtonClick = R.compose(dispatch, hideSourceDelete);

  const handleYesButtonClick = (configContent, selectedSource) => P
    .try(R.compose(
      dispatch,
      setEditConfigContent,
      () => {
        const index =
          defaultToEmptyList(configContent.get('sources')).indexOf(selectedSource);

        if (index < 0) {
          return configContent;
        }

        return configContent.deleteIn(['sources', index]);
      }
    ))
    .then(R.compose(
      dispatch,
      setSelectedSource,
      R.always('')
    ))
    .then(handleCloseButtonClick);

  return {
    handleCloseButtonClick,
    handleYesButtonClick,
  };
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(SourceDelete);
