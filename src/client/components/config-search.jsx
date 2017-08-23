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
          <div className="control has-icons-left">
            <input className="input" type="text" />
            <span className="icon is-small is-left">
              <i className="fa fa-search"></i>
            </span>
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
          this.props.configNames.map((configName) =>
            <Item
              key={configName}
              type={this.props.activeConfigType}
              name={configName} />
          )
        }
      </nav>
    );
  }

  componentWillMount() {
    this.props.loadConfigTypes();
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
  const loadConfigTypes = () => dispatch(actions.loadSearchConfigTypesAsync());

  return {
    loadConfigTypes,
  };
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(ConfigSearch);
