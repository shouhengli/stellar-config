const R = require('ramda');
const {connect} = require('react-redux');

const SourceView = require('../components/ingestion-profile-source-view.jsx');

const {
  newSourceVisibleSelector,
  newSourceSelector,
  deleteSourceVisibleSelector,
  selectedSourceSelector,
  sampleSelector,
} = require('../selectors/ui/ingestion-profile');

const {
  sourcesSelector,
} = require('../selectors/ingestion-profile');

const {
  setSelectedSource,
  loadSampleAsync,
  loadSample,
  revealDeleteSource,
  revealNewSource,
  setNewSource,
  hideNewSource,
  hideDeleteSource,
} = require('../action-creators/ui/ingestion-profile');

const {
  addSource,
  deleteSource,
} = require('../action-creators/ingestion-profile');

const {isNotEmpty} = require('../util');

function mapStateToProps(state) {
  return {
    newSourceVisible: newSourceVisibleSelector(state),
    newSource: newSourceSelector(state),
    deleteSourceVisible: deleteSourceVisibleSelector(state),
    sources: sourcesSelector(state),
    selectedSource: selectedSourceSelector(state),
    sample: sampleSelector(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    handleSourceChange: R.compose(dispatch, setSelectedSource),

    handleSourceDidChange: R.ifElse(
      isNotEmpty,
      R.compose(dispatch, loadSampleAsync),
      R.compose(dispatch, R.partial(loadSample, [null]))
    ),

    handleDeleteButtonClick: R.compose(dispatch, revealDeleteSource),

    handleAddButtonClick: R.compose(dispatch, revealNewSource),

    handleNewSourceChange: R.compose(dispatch, setNewSource),

    handleNewSourceAddButtonClick: R.compose(dispatch, addSource),

    handleNewSourceCancelButtonClick: R.compose(dispatch, hideNewSource),

    handleDeleteSourceYesButtonClick: R.compose(dispatch, deleteSource),

    handleDeleteSourceCancelButtonClick: R.compose(dispatch, hideDeleteSource),
  };
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(SourceView);
