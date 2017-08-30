const React = require('react');

const {connect} = require('react-redux');
const {setEditConfigContent} = require('../action-creators/edit');
const {CONFIG_STATUS_SAVING} = require('../config-status');

require('brace');
require('brace/mode/yaml');
require('brace/theme/github');
const AceEditor = require('react-ace').default;

const ConfigEditor = ({configStatus, configContent, handleChange}) => {
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
      readOnly={configStatus === CONFIG_STATUS_SAVING ? true : false}
      value={configContent}
      onChange={(value) => handleChange(value)} />
  );
};

function mapStateToProps(state) {
  const configContent = state.getIn(['edit', 'content']);
  const configStatus = state.getIn(['edit', 'status']);

  return {
    configContent,
    configStatus,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    handleChange: (value) =>
      dispatch(setEditConfigContent(value)),
  };
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(ConfigEditor);
