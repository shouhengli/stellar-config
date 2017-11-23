const R = require('ramda');
const { connect } = require('react-redux');

const {
  loadAsync,
  saveAsync
} = require('../action-creators/ingestion-profile');

const {
  hideNew,
  setNewName
} = require('../action-creators/ui/ingestion-profile');

const { newNameSelector } = require('../selectors/ui/ingestion-profile');

const New = require('../components/config-new.jsx');

function mapStateToProps(state) {
  return {
    name: newNameSelector(state)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    handleNameChange: R.compose(dispatch, setNewName),

    handleCancelButtonClick: R.compose(dispatch, hideNew),

    handleAddButtonClick: name =>
      R.pipeP(
        R.compose(dispatch, R.partial(saveAsync, [name, {}])),
        R.compose(dispatch, R.partial(loadAsync, [name])),
        R.compose(dispatch, R.partial(setNewName, [''])),
        R.compose(dispatch, hideNew)
      )()
  };
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(New);
