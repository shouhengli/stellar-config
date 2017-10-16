const React = require('react');

const Item = require('./config-search-item.jsx');

class ConfigSearch extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      text,
      names,
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
                value={text}
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
          names
            .filter((name) => name.indexOf(text) >= 0)
            .map((name) =>
              <Item
                key={name}
                name={name}
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
