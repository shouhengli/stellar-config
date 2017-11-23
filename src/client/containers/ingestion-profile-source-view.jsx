const R = require('ramda');
const { connect } = require('react-redux');

const SourceView = require('../components/ingestion-profile-source-view.jsx');

const {
  newSourceVisibleSelector,
  newSourceSelector,
  deleteSourceVisibleSelector,
  selectedSourceSelector,
  sampleOfSelectedSourceSelector
} = require('../selectors/ui/ingestion-profile');

const { sourcesSelector } = require('../selectors/ingestion-profile');

const {
  setSelectedSource,
  revealDeleteSource,
  revealNewSource,
  setNewSource,
  hideNewSource,
  hideDeleteSource,
  addSampleAsync
} = require('../action-creators/ui/ingestion-profile');

const {
  addSource,
  deleteSource
} = require('../action-creators/ingestion-profile');

function mapStateToProps(state) {
  return {
    newSourceVisible: newSourceVisibleSelector(state),
    newSource: newSourceSelector(state),
    deleteSourceVisible: deleteSourceVisibleSelector(state),
    sources: sourcesSelector(state),
    selectedSource: selectedSourceSelector(state),
    sample: sampleOfSelectedSourceSelector(state)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    handleSourceChange: R.compose(dispatch, setSelectedSource),

    handleDeleteButtonClick: R.compose(dispatch, revealDeleteSource),

    handleAddButtonClick: R.compose(dispatch, revealNewSource),

    handleNewSourceChange: R.compose(dispatch, setNewSource),

    handleNewSourceAddButtonClick: source =>
      R.pipeP(
        R.compose(dispatch, R.partial(addSampleAsync, [source])),
        R.compose(dispatch, R.partial(addSource, [source]))
      )(),

    handleNewSourceCancelButtonClick: R.compose(dispatch, hideNewSource),

    handleDeleteSourceYesButtonClick: R.compose(dispatch, deleteSource),

    handleDeleteSourceCancelButtonClick: R.compose(dispatch, hideDeleteSource)
  };
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(SourceView);
