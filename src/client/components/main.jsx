const R = require('ramda');
const React = require('react');
const {connect} = require('react-redux');
const actions = require('../actions');

const {Nav, NavItem} = require('./nav.jsx');
const ConfigSearch = require('./config-search.jsx');
const ConfigSearchToggle = require('./config-search-toggle.jsx');
const ConfigHeader = require('./config-header.jsx');
const ConfigSave = require('./config-save.jsx');
const ConfigEditor = require('./config-editor.jsx');
const FullView = require('./full-view.jsx');
const ModalView = require('./modal-view.jsx');
const NewConfig = require('./new-config.jsx');
const NewConfigToggle = require('./new-config-toggle.jsx');

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
    return (
      <div>
        <Nav>
          {this.props.editing && <NavItem><ConfigHeader /></NavItem>}
          <NavItem>
            {this.props.editing && <ConfigSave />}
            <ConfigSearchToggle />
            <NewConfigToggle />
          </NavItem>
        </Nav>
        <FullView>
          {this.props.editing && <ConfigEditor />}
        </FullView>
        {
          this.props.configSearchVisible
          && (
            <ModalView>
              <ConfigSearch />
            </ModalView>
          )
        }
        {
          this.props.newConfigVisible
          && (
            <ModalView>
              <NewConfig />
            </ModalView>
          )
        }
      </div>
    );
  }

  componentWillMount() {
    this.props.loadConfigTypes();
  }

  onEditorContentChange(value) {
    this.setState({
      editorContent: value,
    });
  }
}

function mapStateToProps(state) {
  const editing = R.not(R.or(
    R.isNil(state.getIn(['edit', 'type'])),
    R.isNil(state.getIn(['edit', 'name']))
  ));

  const configSearchVisible = state.getIn(['search', 'visible']);
  const newConfigVisible = state.getIn(['ui', 'newConfigVisible']);

  return {
    editing,
    configSearchVisible,
    newConfigVisible,
  };
}

function mapDispatchToProps(dispatch) {
  const loadConfigTypes = () => dispatch(actions.loadSearchConfigTypesAsync());

  return {
    loadConfigTypes,
  };
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(Main);
