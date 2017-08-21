const React = require('react');
const ConfigSearch = require('./config-search.jsx');
const ConfigHeader = require('./config-header.jsx');

require('brace');
require('brace/mode/yaml');
require('brace/theme/github');
const AceEditor = require('react-ace').default;

const lorem = 'Lorem Ipsum '.repeat(1000);

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
        <nav className="navbar is-fixed">
          <div className="navbar-brand">
            <div className="navbar-item">
              SEAWEED
            </div>
          </div>
          <div className="navbar-menu">
            <div className="navbar-start">
              <div className="navbar-item">
                <ConfigHeader />
              </div>
              <div className="navbar-item">
                <span className="icon is-small">
                  <i className="fa fa-search"></i>
                </span>
              </div>
              <div className="navbar-item">
                <ConfigSearch />
              </div>
              <div className="navbar-item">
                <a className="button">Save</a>
              </div>
            </div>
          </div>
        </nav>
        <div className="pane is-pulled-left">
          <AceEditor
            name="code-editor"
            mode="yaml"
            theme="github"
            width="100%"
            height="100%"
            fontSize={16}
            tabSize={2}
            showPrintMargin={false}
            setOptions={{scrollPastEnd: false}}
            value={this.state.editorContent}
            onChange={(value) => this.onEditorContentChange(value)} />
        </div>
        <div className="pane is-pulled-right is-scrollable">
          {lorem}
        </div>
      </div>
    );
  }

  onEditorContentChange(value) {
    this.setState({
      editorContent: value,
    });
  }
}

module.exports = Main;
