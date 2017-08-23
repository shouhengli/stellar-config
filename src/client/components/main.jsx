const R = require('ramda');
const React = require('react');
const {connect} = require('react-redux');

const {Nav, NavItem, StartAlignedNavItem} = require('./nav.jsx');
const ConfigSearch = require('./config-search.jsx');
const ConfigSearchIcon = require('./config-search-icon.jsx');
const ConfigSearchClose = require('./config-search-close.jsx');
const ConfigHeader = require('./config-header.jsx');
const ConfigEditor = require('./config-editor.jsx');
const FullView = require('./full-view.jsx');

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
        <Nav itemClassNames={[null, 'has-content-start']}>
          {this.props.configHeaderVisible && <NavItem><ConfigHeader /></NavItem>}
          {
            this.props.configSearchVisible ? (
              <StartAlignedNavItem>
                <ConfigSearch />
                <ConfigSearchClose />
              </StartAlignedNavItem>
            ) : (
              <NavItem>
                <ConfigSearchIcon />
              </NavItem>
            )
          }
        </Nav>
        <FullView>
          <ConfigEditor />
        </FullView>
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
  const configHeaderVisible = R.not(R.or(
    R.isNil(state.getIn(['edit', 'type'])),
    R.isNil(state.getIn(['edit', 'name']))
  ));

  const configSearchVisible = state.getIn(['search', 'visible']);

  return {
    configHeaderVisible,
    configSearchVisible,
  };
}

module.exports = connect(mapStateToProps)(Main);
