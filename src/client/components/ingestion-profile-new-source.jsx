const React = require('react');

module.exports = (props) => {
  const {
    configContent,
    newSource,
    handleNewSourceChange,
    handleAddNewSource,
    handleHideNewSource,
  } = props;

  return [
    <div key="input" className="control">
      <input
        type="text"
        className="input"
        placeholder="http://..."
        value={newSource}
        onChange={(event) => handleNewSourceChange(event.target.value)} />
    </div>,
    <div key="add" className="control">
      <button
        className="button"
        onClick={() => handleAddNewSource(configContent, newSource)}>
        Add
      </button>
    </div>,
    <div key="cancel" className="control">
      <button
        className="button"
        onClick={() => handleHideNewSource()}>
        Cancel
      </button>
    </div>,
  ];
};
