const React = require('react');

require('brace');
require('brace/mode/yaml');
require('brace/theme/github');
const AceEditor = require('react-ace').default;

const lorem = `
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis a lectus sed ante sagittis feugiat. Nulla hendrerit fermentum sem in tristique. Suspendisse hendrerit consequat sapien, id consectetur nisl varius id. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ultricies ligula id lectus elementum, sit amet tempus justo maximus. Nullam gravida, libero nec rutrum mollis, eros eros ornare neque, interdum facilisis libero arcu in neque. Proin ut ipsum vel arcu commodo porttitor vitae eu neque. Mauris feugiat mattis neque, non porta lacus ultricies a. Donec ut eros metus. Maecenas facilisis massa eleifend, tempus ligula sed, consectetur sapien. Nam ac hendrerit odio.

Quisque sagittis elit justo, vitae ornare nunc volutpat sit amet. Duis erat lorem, porttitor sed ultrices a, rhoncus quis tellus. Aenean lacinia fringilla enim condimentum congue. Proin commodo pulvinar sapien, eu tempor quam congue vel. Maecenas consectetur viverra nunc quis laoreet. Pellentesque cursus nibh at lectus sagittis fringilla. Suspendisse iaculis pharetra dui, euismod porta lorem dictum ac. Ut quis risus bibendum, ullamcorper orci at, pellentesque mi. Donec et finibus diam, eu mollis sapien.

Pellentesque dolor nisl, feugiat congue enim eget, pharetra placerat tortor. Integer eget nisl vitae odio laoreet consectetur ut vitae augue. Donec viverra nisl eget magna porttitor pellentesque. Praesent ut mauris accumsan arcu gravida porta ut non ante. Sed luctus ex quis augue varius commodo luctus ut odio. Donec congue, lorem ac suscipit pretium, nibh mi pretium mauris, quis congue ipsum turpis quis nisi. Sed ac metus pretium, pretium justo in, egestas magna. Mauris nec dignissim justo. Nullam magna arcu, lobortis mattis consequat quis, aliquet et mauris. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Integer sollicitudin lobortis est. Maecenas aliquam consequat urna eget iaculis.

Ut lorem ligula, pharetra scelerisque ullamcorper suscipit, cursus nec mauris. Sed at dui diam. Nulla id nibh purus. Duis mauris orci, interdum a interdum et, bibendum rutrum justo. Morbi non facilisis lorem. Etiam in turpis vulputate, finibus turpis vitae, molestie ligula. Ut interdum mauris ac purus eleifend ullamcorper. Ut dictum nisi at leo pharetra, at malesuada tortor tempus. Praesent condimentum placerat maximus. Proin lacinia lobortis mi, a volutpat risus dignissim maximus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nullam iaculis ipsum sit amet hendrerit mollis. In hac habitasse platea dictumst.

Nulla efficitur, felis non accumsan posuere, arcu mauris tempus ex, et hendrerit arcu purus nec velit. Aenean eget eleifend neque. Aenean auctor eros non quam auctor iaculis. Donec imperdiet commodo maximus. Pellentesque tortor nunc, ornare sed nibh id, tempor posuere ante. Pellentesque congue vestibulum justo, nec mattis mauris euismod non. Morbi sit amet purus eget sem vehicula semper ut et ligula.
`;

/**
 * The main component.
 */
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

  /**
   * Renders the component.
   * @return {JSX.Element}
   */
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
                Filename
              </div>
              <div className="navbar-item">
                <span className="tag">
                  mode
                </span>
              </div>
            </div>
            <div className="navbar-end">
              <div className="navbar-item">
                <div className="field is-relative">
                  <nav className="panel is-absolute">
                    <div className="panel-block">
                      <span className="panel-icon">
                        <i className="fa fa-book"></i>
                      </span>
                      file1
                    </div>
                    <div className="panel-block">
                      <span className="panel-icon">
                        <i className="fa fa-book"></i>
                      </span>
                      file2
                    </div>
                  </nav>
                  <div className="control has-icons-right">
                    <input className="input" type="text" />
                    <span className="icon is-small is-right">
                      <i className="fa fa-search"></i>
                    </span>
                  </div>
                </div>
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
            fontSize="16"
            tabSize="2"
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
