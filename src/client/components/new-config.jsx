const React = require('react');

module.exports = (props) => {
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
