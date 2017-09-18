const R = require('ramda');
const React = require('react');
const {connect} = require('react-redux');
const {loadSearchConfigTypesAsync} = require('../action-creators/search');
const {initLayoutAsync} = require('../action-creators/graph-schema');

const {Nav, NavItem} = require('../components/nav.jsx');
const ConfigHeader = require('../components/config-header.jsx');
const GraphSchema = require('../components/graph-schema.jsx');
const FullView = require('../components/full-view.jsx');
const SplitView = require('../components/split-view.jsx');
const ModalView = require('../components/modal-view.jsx');
const NewConfig = require('../components/new-config.jsx');
const NewConfigToggle = require('../components/new-config-toggle.jsx');

const ConfigSave = require('./config-save.jsx');
const ConfigEditor = require('./config-editor.jsx');
const ConfigSearch = require('./config-search.jsx');
const ConfigSearchToggle = require('./config-search-toggle.jsx');
const ConfigSearchTab = require('./config-search-tab.jsx');
const ConfigSearchActiveTab = require('./config-search-active-tab.jsx');
const ConfigSearchItem = require('./config-search-item.jsx');
const ConfigDelete = require('./config-delete.jsx');
const ConfigDeleteToggle = require('./config-delete-toggle.jsx');

const GRAPH_SCHEMA_CONFIG_TYPE = 'graphSchema';

class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editorContent: '',
    };
  }

  static get displayName() {
    return 'Main';
  }

  render() {
    const {
      configType,
      configName,
      editing,
      configSearchVisible,
      newConfigVisible,
      configDeleteVisible,
    } = this.props;

    return (
      <div>
        <Nav>
          {
            editing && (
              <NavItem>
                <ConfigHeader {...{configType, configName}} />
              </NavItem>
            )
          }
          <NavItem>
            {editing && <ConfigSave />}
            <ConfigSearchToggle />
            <NewConfigToggle />
            {editing && <ConfigDeleteToggle />}
          </NavItem>
        </Nav>

        {
          editing && (
            configType === GRAPH_SCHEMA_CONFIG_TYPE ? (
              <SplitView>
                <ConfigEditor />
                <GraphSchema />
              </SplitView>
            ) : (
              <FullView>
                <ConfigEditor />
              </FullView>
            )
          )
        }
        {
          configSearchVisible
          && (
            <ModalView>
              <ConfigSearch
                Tab={ConfigSearchTab}
                ActiveTab={ConfigSearchActiveTab}
                Item={ConfigSearchItem} />
            </ModalView>
          )
        }
        {
          newConfigVisible
          && (
            <ModalView>
              <NewConfig />
            </ModalView>
          )
        }
        {
          configDeleteVisible
          && (
            <ModalView>
              <ConfigDelete />
            </ModalView>
          )
        }
      </div>
    );
  }

  componentWillMount() {
    this.props.loadConfigTypes();
  }

  componentDidMount() {
    this.props.initGraphSchemaLayout();
  }
}

function mapStateToProps(state) {
  const configType = state.getIn(['edit', 'type']);
  const configName = state.getIn(['edit', 'name']);

  const editing = R.not(R.or(
    R.isNil(configType),
    R.isNil(configName)
  ));

  const configSearchVisible = state.getIn(['search', 'visible']);
  const newConfigVisible = state.getIn(['ui', 'newConfigVisible']);
  const configDeleteVisible = state.getIn(['ui', 'configDeleteVisible']);

  return {
    configType,
    configName,
    editing,
    configSearchVisible,
    newConfigVisible,
    configDeleteVisible,
  };
}

function mapDispatchToProps(dispatch) {
  const loadConfigTypes = () => dispatch(loadSearchConfigTypesAsync());

  const initGraphSchemaLayout = () => dispatch(initLayoutAsync());

  return {
    loadConfigTypes,
    initGraphSchemaLayout,
  };
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(Main);
