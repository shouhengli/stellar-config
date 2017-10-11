const React = require('react');

const {GRAPH_SCHEMA_CONFIG_TYPE} = require('../graph-schema');
const {INGESTION_PROFILE_CONFIG_TYPE} = require('../ingestion-profile');

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
      Nav,
      NavItem,
      NavDropDown,
      NavMenuStart,
      NavMenuEnd,
      ConfigHeader,
      FullView,
      SplitView,
      ModalView,
      NewConfig,
      NewConfigToggle,
      ConfigSave,
      ConfigEditor,
      ConfigSearch,
      ConfigSearchToggle,
      ConfigDelete,
      ConfigDeleteToggle,
      GraphSchema,
      IngestionProfile,
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
          <NavMenuStart>
            <NavDropDown
              label="Ingestion Profile"
              items={['Ingestion Profile', 'Monitor']}/>
            {editing && <ConfigHeader configName={configName} />}
          </NavMenuStart>
          <NavMenuEnd>
            <NavItem>
              {editing && <ConfigSave />}
              <ConfigSearchToggle />
              <NewConfigToggle />
              {editing && <ConfigDeleteToggle />}
            </NavItem>
          </NavMenuEnd>
        </Nav>
        {
          editing && configType === GRAPH_SCHEMA_CONFIG_TYPE && (
            <SplitView>
              <ConfigEditor />
              <GraphSchema />
            </SplitView>
          )
        }

        {
          editing && configType === INGESTION_PROFILE_CONFIG_TYPE && (
            <FullView>
              <IngestionProfile />
            </FullView>
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

module.exports = Main;
