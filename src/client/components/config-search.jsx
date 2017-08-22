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
      <div className="field config-search">
        <nav className="panel">
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
            this.props.configNames.map((configName) =>
              <Item
                key={configName}
                type={this.props.activeConfigType}
                name={configName} />
            )
          }
        </nav>
        <div className="control has-icons-right">
          <input
            className="input"
            type="text"
            onFocus={() => this.props.handleSearchInputFocus()} />
          <span className="icon is-small is-right">
            <i className="fa fa-search"></i>
          </span>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const configTypes = state.getIn(['search', 'types']);
  const activeConfigType = state.getIn(['search', 'activeType']);
  const configNames = state.getIn(['search', 'names'], List());

  return {
    configTypes,
    activeConfigType,
    configNames,
  };
}

function mapDispatchToProps(dispatch) {
  const handleSearchInputFocus = () => dispatch(actions.loadSearchConfigTypesAsync());

  return {
    handleSearchInputFocus,
  };
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(ConfigSearch);
