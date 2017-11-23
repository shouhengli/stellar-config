const React = require('react');

module.exports = props => {
  const {
    name,
    handleNameChange,
    handleCancelButtonClick,
    handleAddButtonClick
  } = props;

  return (
    <div className="new-config box">
      <div className="field">
        <label className="label">Name</label>
        <div className="control">
          <input
            type="text"
            className="input"
            value={name}
            onChange={event => handleNameChange(event.target.value)}
          />
        </div>
      </div>
      <div className="field is-grouped is-grouped-centered">
        <div className="control">
          <button
            className="button is-primary"
            onClick={() => handleAddButtonClick(name)}>
            Add
          </button>
        </div>
        <div className="control">
          <button className="button" onClick={() => handleCancelButtonClick()}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
