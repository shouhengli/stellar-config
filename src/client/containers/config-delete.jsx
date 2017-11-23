const R = require('ramda');
const { connect } = require('react-redux');
const Delete = require('../components/config-delete.jsx');

const { deleteAsync } = require('../action-creators/ingestion-profile');

const {
  setDeleteName,
  hideDelete
} = require('../action-creators/ui/ingestion-profile');

const { nameSelector } = require('../selectors/ingestion-profile');

const { deleteNameSelector } = require('../selectors/ui/ingestion-profile');

function mapStateToProps(state) {
  return {
    name: nameSelector(state),
    deleteName: deleteNameSelector(state)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    handleNameChange: R.compose(dispatch, setDeleteName),

    handleCloseButtonClick: R.compose(dispatch, hideDelete),

    handleDeleteButtonClick: R.compose(dispatch, deleteAsync)
  };
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(Delete);
