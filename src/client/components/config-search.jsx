const React = require('react');

const Item = require('./config-search-item.jsx');

class ConfigSearch extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      searchText,
      configNames,
      handleSearchTextChange,
      handleHideButtonClick,
      handleItemClick,
    } = this.props;

    return (
      <nav className="panel config-search">
        <div className="panel-block config-search-input">
          <div className="field has-addons">
            <div className="control has-icons-left is-expanded">
              <input
                className="input is-medium"
                type="text"
                value={searchText}
                onChange={(event) => handleSearchTextChange(event.target.value)} />
              <span className="icon is-left">
                <i className="fa fa-search"></i>
              </span>
            </div>
            <div className="control">
              <button
                className="button is-medium"
                onClick={() => handleHideButtonClick()}>
                <span className="icon is-small">
                  <i className="fa fa-times"></i>
                </span>
              </button>
            </div>
          </div>
        </div>
        {
          configNames
            .filter((configName) => configName.indexOf(searchText) >= 0)
            .map((configName) =>
              <Item
                key={configName}
                name={configName}
                handleClick={handleItemClick} />
            )
        }
      </nav>
    );
  }

  componentDidMount() {
    this.props.handleComponentDidMount();
  }
}

module.exports = ConfigSearch;
