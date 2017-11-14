const R = require('ramda');
const React = require('react');
const NewSource = require('./ingestion-profile-new-source.jsx');

module.exports =
  ({
    sources,
    selectedSource,
    newSourceVisible,
    newSource,
    handleSourceChange,
    handleDeleteButtonClick,
    handleAddButtonClick,
    handleNewSourceChange,
    handleNewSourceAddButtonClick,
    handleNewSourceCancelButtonClick,
  }) =>
    <div className="field is-horizontal">
      <div className="field-label is-normal">
        <label className="label">
          Source
        </label>
      </div>
      <div className="field-body">
        <div className="field is-grouped">
          {
            newSourceVisible
            ? (
              <NewSource
                newSource={newSource}
                handleNewSourceChange={handleNewSourceChange}
                handleAddButtonClick={handleNewSourceAddButtonClick}
                handleCancelButtonClick={handleNewSourceCancelButtonClick} />
            )
            : [
              <div key="list" className="control">
                <div className="select">
                  <select
                    value={selectedSource}
                    onChange={(event) => handleSourceChange(event.target.value)}>
                    <option value=''>(None)</option>
                    {
                      sources.map((s, i) =>
                        <option key={i} value={s}>{s}</option>
                      )
                    }
                  </select>
                </div>
              </div>,
              <div key="add" className="control">
                <button
                  className="button"
                  onClick={() => handleAddButtonClick()}>
                  Add
                </button>
              </div>,
              <div key="delete" className="control">
                <button
                  className="button is-outlined is-danger"
                  disabled={R.isEmpty(selectedSource)}
                  onClick={() => handleDeleteButtonClick()}>
                  Delete
                </button>
              </div>,
            ]
          }
        </div>
      </div>
    </div>;
