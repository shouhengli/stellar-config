const R = require('ramda');
const React = require('react');
const {connect} = require('react-redux');
const {loadSearchConfigTypesAsync} = require('../action-creators/search');
const {initLayoutAsync} = require('../action-creators/graph-schema');

const {Nav, NavItem} = require('./nav.jsx');
const ConfigSearch = require('./config-search.jsx');
const ConfigSearchToggle = require('./config-search-toggle.jsx');
const ConfigHeader = require('./config-header.jsx');
const ConfigSave = require('./config-save.jsx');
const ConfigEditor = require('./config-editor.jsx');
const GraphSchema = require('./graph-schema.jsx');
const FullView = require('./full-view.jsx');
const SplitView = require('./split-view.jsx');
const ModalView = require('./modal-view.jsx');
const NewConfig = require('./new-config.jsx');
const NewConfigToggle = require('./new-config-toggle.jsx');
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
      editing,
      configSearchVisible,
      newConfigVisible,
      configDeleteVisible,
    } = this.props;

    return (
      <div>
        <Nav>
          {editing && <NavItem><ConfigHeader /></NavItem>}
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
              <ConfigSearch />
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

  const editing = R.not(R.or(
    R.isNil(configType),
    R.isNil(state.getIn(['edit', 'name']))
  ));

  const configSearchVisible = state.getIn(['search', 'visible']);
  const newConfigVisible = state.getIn(['ui', 'newConfigVisible']);
  const configDeleteVisible = state.getIn(['ui', 'configDeleteVisible']);

  return {
    configType,
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
