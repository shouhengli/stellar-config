const R = require('ramda');
const React = require('react');
const {connect} = require('react-redux');

const {Nav, NavItem} = require('./nav.jsx');
const ConfigSearch = require('./config-search.jsx');
const ConfigSearchToggle = require('./config-search-toggle.jsx');
const ConfigHeader = require('./config-header.jsx');
const ConfigSave = require('./config-save.jsx');
const ConfigEditor = require('./config-editor.jsx');
const FullView = require('./full-view.jsx');
const ModalView = require('./modal-view.jsx');

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
          {this.props.editing && <ConfigSave />}
          <NavItem>
            <ConfigSearchToggle />
          </NavItem>
        </Nav>
        <FullView>
          {this.props.editing && <ConfigEditor />}
        </FullView>
        <ModalView active={this.props.configSearchVisible}>
          <ConfigSearch />
        </ModalView>
      </div>
    );
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

  return {
    editing,
    configSearchVisible,
  };
}

module.exports = connect(mapStateToProps)(Main);
