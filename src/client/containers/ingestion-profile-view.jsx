const React = require('react');
const { connect } = require('react-redux');
const R = require('ramda');

const View = require('../components/ingestion-profile-view.jsx');
const SourceView = require('./ingestion-profile-source-view.jsx');
const GraphSchema = require('./graph-schema.jsx');
const ConfigEditor = require('./config-editor.jsx');
const MappingView = require('./ingestion-profile-mapping-view.jsx');

const {
  activeTabSelector,
  samplesSelector
} = require('../selectors/ui/ingestion-profile');
const {
  nameSelector,
  sourcesSelector
} = require('../selectors/ingestion-profile');

const { loadSamplesAsync } = require('../action-creators/ui/ingestion-profile');

function mapStateToProps(state) {
  return {
    name: nameSelector(state),
    activeTab: activeTabSelector(state),
    sources: sourcesSelector(state),
    samples: samplesSelector(state)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    handleWillChangeIngestionProfile: R.compose(dispatch, loadSamplesAsync)
  };
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(props => (
  <View
    SourceView={SourceView}
    GraphSchema={GraphSchema}
    ConfigEditor={ConfigEditor}
    MappingView={MappingView}
    {...props}
  />
));
