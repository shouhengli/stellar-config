const React = require('react');
const R = require('ramda');
const {List} = require('immutable');

const defaultToEmptyList = R.defaultTo(List());
const defaultToEmptyString = R.defaultTo('');

module.exports = (props) => {
  const {
    configContent,
    selectedSource,
    newSource,
    handleSourceChange,
    handleNewSourceChange,
    handleAddNewSource,
  } = props;

  return (
    <div className="field is-horizontal">
      <div className="field-label is-normal">
        <label className="label">
          Source
        </label>
      </div>
      <div className="field-body">
        <div className="field is-grouped">
          <div className="control">
            <div className="select">
              <select
                value={defaultToEmptyString(selectedSource)}
                onChange={(event) => handleSourceChange(event.target.value)}>
                {
                  defaultToEmptyList(configContent.get('sources')).map((s, i) =>
                    <option key={i} value={s}>{s}</option>
                  )
                }
              </select>
            </div>
          </div>
          <div className="control">
            <button
              className="button"
              onClick={() => handleAddNewSource(configContent, newSource)}>
              Add
            </button>
          </div>
          <div className="control">
            <input
              type="text"
              className="input"
              placeholder="http://..."
              value={newSource}
              onChange={(event) => handleNewSourceChange(event.target.value)} />
          </div>
        </div>
      </div>
    </div>
  );
};
