const React = require('react');
const R = require('ramda');
const {connect} = require('react-redux');
const actions = require('../actions');

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

  const selectedConfigType = R.contains(configType, searchConfigTypes)
                           ? configType
                           : R.head(searchConfigTypes) || '';

  return {
    configTypes: searchConfigTypes,
    selectedConfigType,
    configName,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    handleConfigTypeChange: (event) =>
      dispatch(actions.setNewConfigType(event.target.value)),
    handleConfigNameChange: (event) =>
      dispatch(actions.setNewConfigName(event.target.value)),
    handleCancelButtonClick: () =>
      dispatch(actions.hideNewConfig()),
    handleAddButtonClick: (configType, configName) =>
      Promise
        .resolve(dispatch(actions.addNewConfig(configType, configName)))
        .then(() => dispatch(actions.hideNewConfig())),
  };
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(NewConfig);
