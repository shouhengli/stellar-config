const {List} = require('immutable');
const React = require('react');
const {connect} = require('react-redux');
const actions = require('../actions');

const Tab = require('./config-search-tab.jsx');
const ActiveTab = require('./config-search-active-tab.jsx');
const Item = require('./config-search-item.jsx');

class ConfigSearch extends React.Component {
  constructor(props) {
    super(props);
  }

  static get displayName() {
    return 'Config Search';
  }

  render() {
    return (
      <nav className="panel config-search">
        <div className="panel-block config-search-input">
          <div className="field has-addons">
            <div className="control has-icons-left is-expanded">
              <input
                className="input is-medium"
                type="text"
                value={this.props.searchText}
                onChange={(event) => this.props.handleSearchTextChange(event)} />
              <span className="icon is-left">
                <i className="fa fa-search"></i>
              </span>
            </div>
            <div className="control">
              <button
                className="button is-medium"
                onClick={() => this.props.hideSearch()}>
                <span className="icon is-small">
                  <i className="fa fa-times"></i>
                </span>
              </button>
            </div>
          </div>
        </div>
        <div className="panel-tabs">
          {
            this.props.configTypes.map((configType) => {
              if (configType === this.props.activeConfigType) {
                return <ActiveTab key={configType} title={configType} />;
              } else {
                return <Tab key={configType} title={configType} />;
              }
            })
          }
        </div>
        {
          this.props.configNames
              .filter((configName) =>
                configName.indexOf(this.props.searchText) >= 0
              )
              .map((configName) =>
                <Item
                  key={configName}
                  type={this.props.activeConfigType}
                  name={configName} />
              )
        }
      </nav>
    );
  }
}

function mapStateToProps(state) {
  const configTypes = state.getIn(['search', 'types']);
  const activeConfigType = state.getIn(['search', 'activeType']);
  const configNames = state.getIn(['search', 'names'], List());
  const searchText = state.getIn(['search', 'text']);

  return {
    configTypes,
    activeConfigType,
    configNames,
    searchText,
  };
}

function mapDispatchToProps(dispatch) {
  const hideSearch = () => dispatch(actions.hideSearch());
  const handleSearchTextChange =
    (event) => dispatch(actions.setSearchText(event.target.value));

  return {
    hideSearch,
    handleSearchTextChange,
  };
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(ConfigSearch);
