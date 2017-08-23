const React = require('react');

const {connect} = require('react-redux');
const actions = require('../actions');

require('brace');
require('brace/mode/yaml');
require('brace/theme/github');
const AceEditor = require('react-ace').default;

const ConfigEditor = ({configContent, handleChange}) => {
  return (
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
      editorProps={{$blockScrolling: Infinity}}
      value={configContent}
      onChange={(value) => handleChange(value)} />
  );
};

function mapStateToProps(state) {
  const configContent = state.getIn(['edit', 'content']);

  return {
    configContent,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    handleChange: (value) =>
      actions.setEditConfigContent(value),
  };
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(ConfigEditor);
