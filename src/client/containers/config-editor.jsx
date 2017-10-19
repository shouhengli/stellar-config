const R = require('ramda');
const {connect} = require('react-redux');
const {setEditorContent} = require('../action-creators/ui/graph-schema');
const {CONFIG_STATUS_SAVING} = require('../config-status');

require('brace');
require('brace/mode/yaml');
require('brace/theme/github');
const AceEditor = require('react-ace').default;

const {statusSelector} = require('../selectors/ingestion-profile');
const {editorContentSelector} = require('../selectors/ui/graph-schema');

function mapStateToProps(state) {
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
    readOnly: statusSelector(state) === CONFIG_STATUS_SAVING ? true : false,
    value: editorContentSelector(state),
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    onChange: R.compose(dispatch, setEditorContent),
  };
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(AceEditor);
