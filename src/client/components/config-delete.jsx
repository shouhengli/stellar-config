const React = require('react');
const {connect} = require('react-redux');
const actions = require('../actions');

const ConfigDelete = (props) => {
  const {
    configType,
    configName,
    configDeleteName,
    confirmed,
    handleNameChange,
    handleCloseButtonClick,
    handleDeleteButtonClick,
  } = props;

  return (
    <div className="message is-danger">
      <div className="message-header">
        Confirmation
        <button
          className="delete"
          onClick={() => handleCloseButtonClick()}>
        </button>
      </div>
      <div className="message-body">
        <p>
          Please type the configuration name to confirm the deletion.
        </p>
        <div className="field has-addons">
          <div className="control is-expanded">
            <input
              className="input is-danger"
              type="text"
              value={configDeleteName}
              onChange={(event) => handleNameChange(event)} />
          </div>
          <div className="control">
            {
              confirmed
              ?
              <button
                className="button is-danger"
                onClick={() => handleDeleteButtonClick(configType, configName)}>
                Delete
              </button>
              :
              <button
                className="button is-danger"
                disabled={true}>
                Delete
              </button>
            }
          </div>
        </div>
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  const configType = state.getIn(['edit', 'type']);
  const configName = state.getIn(['edit', 'name']);
  const configDeleteName = state.getIn(['ui', 'configDeleteName']);
  const confirmed = configDeleteName === configName;

  return {
    configType,
    configName,
    configDeleteName,
    confirmed,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    handleNameChange: (event) =>
      dispatch(actions.setConfigDeleteName(event.target.value)),

    handleCloseButtonClick: () =>
      dispatch(actions.hideConfigDelete()),

    handleDeleteButtonClick: (configType, configName) =>
      dispatch(actions.deleteConfigAsync(configType, configName))
        .then(() => dispatch(actions.resetEditConfig()))
        .then(() => dispatch(actions.setConfigDeleteName(null)))
        .then(() => dispatch(actions.hideConfigDelete())),
  };
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(ConfigDelete);
