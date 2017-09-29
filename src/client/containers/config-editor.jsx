const {connect} = require('react-redux');
const {Map} = require('immutable');
const {setEditConfigContent} = require('../action-creators/edit');
const {CONFIG_STATUS_SAVING} = require('../config-status');

require('brace');
require('brace/mode/yaml');
require('brace/theme/github');
const AceEditor = require('react-ace').default;

function mapStateToProps(state) {
  const configContent = state.getIn(['edit', 'content', 'yaml']);
  const configStatus = state.getIn(['edit', 'status']);

  return {
    name: 'code-editor',
    mode: 'yaml',
    theme: 'github',
    width: '100%',
    height: '100%',
    fontSize: 16,
    tabSize: 2,
    showPrintMargin: false,
    setOptions: {scrollPastEnd: false},
    editorProps: {$blockScrolling: Infinity},
    readOnly: configStatus === CONFIG_STATUS_SAVING ? true : false,
    value: configContent,
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    onChange: (value) => {
      dispatch(setEditConfigContent(Map({yaml: value})));
    },
  };
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(AceEditor);
