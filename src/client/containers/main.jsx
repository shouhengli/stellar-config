const R = require('ramda');
const React = require('react');
const {connect} = require('react-redux');
const {loadSearchConfigTypesAsync} = require('../action-creators/search');
const {initLayoutAsync} = require('../action-creators/graph-schema');

const Nav = require('../components/nav.jsx');
const NavItem = require('../components/nav-item.jsx');
const NavMenuStart = require('../components/nav-menu-start.jsx');
const NavMenuEnd = require('../components/nav-menu-end.jsx');
const NavDropDown = require('../components/nav-drop-down.jsx');
const ConfigHeader = require('../components/config-header.jsx');
const FullView = require('../components/full-view.jsx');
const SplitView = require('../components/split-view.jsx');
const ModalView = require('../components/modal-view.jsx');
const Main = require('../components/main.jsx');

const NewConfig = require('./new-config.jsx');
const NewConfigToggle = require('./new-config-toggle.jsx');
const ConfigSave = require('./config-save.jsx');
const ConfigEditor = require('./config-editor.jsx');
const ConfigSearch = require('./config-search.jsx');
const ConfigSearchToggle = require('./config-search-toggle.jsx');
const ConfigDelete = require('./config-delete.jsx');
const ConfigDeleteToggle = require('./config-delete-toggle.jsx');
const GraphSchema = require('./graph-schema.jsx');
const IngestionProfile = require('./ingestion-profile.jsx');

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

module.exports = connect(mapStateToProps, mapDispatchToProps)((props) => {
  return (
    <Main
      Nav={Nav}
      NavItem={NavItem}
      NavMenuStart={NavMenuStart}
      NavMenuEnd={NavMenuEnd}
      NavDropDown={NavDropDown}
      ConfigHeader={ConfigHeader}
      FullView={FullView}
      SplitView={SplitView}
      ModalView={ModalView}
      NewConfig={NewConfig}
      NewConfigToggle={NewConfigToggle}
      ConfigSave={ConfigSave}
      ConfigEditor={ConfigEditor}
      ConfigSearch={ConfigSearch}
      ConfigSearchToggle={ConfigSearchToggle}
      ConfigDelete={ConfigDelete}
      ConfigDeleteToggle={ConfigDeleteToggle}
      GraphSchema={GraphSchema}
      IngestionProfile={IngestionProfile}
      {...props} />
  );
});
