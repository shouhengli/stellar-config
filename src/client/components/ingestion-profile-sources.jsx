const R = require('ramda');
const React = require('react');
const {defaultToEmptyList} = require('../util');

class Sources extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      NewSource,
      configContent,
      selectedSource,
      handleSourceChange,
      handleDeleteSource,
      handleRevealNewSource,
      newSourceVisible,
    } = this.props;

    return (
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
                <NewSource configContent={configContent} />
              )
              : [
                <div key="list" className="control">
                  <div className="select">
                    <select
                      value={selectedSource}
                      onChange={(event) => handleSourceChange(event.target.value)}>
                      <option value=''>(None)</option>
                      {
                        defaultToEmptyList(configContent.get('sources'))
                          .map((s, i) =>
                            <option key={i} value={s}>{s}</option>
                          )
                      }
                    </select>
                  </div>
                </div>,
                <div key="add" className="control">
                  <button
                    className="button"
                    onClick={() => handleRevealNewSource()}>
                    Add
                  </button>
                </div>,
                <div key="delete" className="control">
                  <button
                    className="button is-outlined is-danger"
                    disabled={R.isEmpty(selectedSource)}
                    onClick={() => handleDeleteSource()}>
                    Delete
                  </button>
                </div>,
              ]
            }
          </div>
        </div>
      </div>
    );
  }

  componentDidUpdate(prevProps) {
    if (this.props.selectedSource !== prevProps.selectedSource) {
      this.props.handleSourceDidChange(this.props.selectedSource);
    }
  }
}

module.exports = Sources;
