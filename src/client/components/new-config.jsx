const React = require('react');
const {connect} = require('react-redux');
const {
  hideNewConfig,
  addNewConfig,
  setNewConfigName,
  setNewConfigType,
} = require('../action-creators/edit');

const NewConfig = (props) => {
  const {
    configTypes,
    selectedConfigType,
    configName,
    handleConfigTypeChange,
    handleConfigNameChange,
    handleCancelButtonClick,
    handleAddButtonClick,
  } = props;

  return (
    <div className="box">
      <div className="field">
        <label className="label">Type</label>
        <div className="control is-expaned">
          <div className="select is-fullwidth">
            <select
              value={selectedConfigType}
              onChange={(event) => handleConfigTypeChange(event)}>
              {
                configTypes.map((configType) => {
                  return (
                    <option
                      key={configType}
                      value={configType}>
                      {configType}
                    </option>
                  );
                })
              }
            </select>
          </div>
        </div>
      </div>
      <div className="field">
        <label className="label">Name</label>
        <div className="control">
          <input
            type="text"
            className="input"
            value={configName}
            onChange={(event) => handleConfigNameChange(event)} />
        </div>
      </div>
      <div className="field is-grouped is-grouped-centered">
        <div className="control">
          <button
            className="button is-primary"
            onClick={() => handleAddButtonClick(selectedConfigType, configName)}>
            Add
          </button>
        </div>
        <div className="control">
          <button
            className="button"
            onClick={() => handleCancelButtonClick()}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  const configType = state.getIn(['ui', 'newConfigType']);
  const searchConfigTypes = state.getIn(['search', 'types']);
  const configName = state.getIn(['ui', 'newConfigName']);

  const selectedConfigType = searchConfigTypes.indexOf(configType) >= 0
                           ? configType
                           : searchConfigTypes.first() || '';

  return {
    configTypes: searchConfigTypes,
    selectedConfigType,
    configName,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    handleConfigTypeChange: (event) =>
      dispatch(setNewConfigType(event.target.value)),
    handleConfigNameChange: (event) =>
      dispatch(setNewConfigName(event.target.value)),
    handleCancelButtonClick: () =>
      dispatch(hideNewConfig()),
    handleAddButtonClick: (configType, configName) =>
      Promise
        .resolve(dispatch(addNewConfig(configType, configName)))
        .then(() => dispatch(hideNewConfig())),
  };
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(NewConfig);
