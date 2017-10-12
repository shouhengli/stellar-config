const R = require('ramda');
const {connect} = require('react-redux');
const GraphSchemas = require('../components/ingestion-profile-graph-schemas.jsx');
const {setEditConfigContent} = require('../action-creators/ingestion-profile');

const {
  loadGraphSchemasAsync,
} = require('../action-creators/ingestion-profile');

function mapStateToProps(state) {
  const configName = state.getIn(['edit', 'name']);
  const configContent = state.getIn(['edit', 'content']);

  const ingestionProfile = state.get('ingestionProfile');
  const graphSchemas = ingestionProfile.get('graphSchemas');

  return {
    configName,
    configContent,
    graphSchemas,
  };
}

function mapDispatchToProps(dispatch) {
  const handleGraphSchemaChange = R.compose(
    dispatch,
    setEditConfigContent,
    (configContent, selectedGraphSchema) =>
      configContent.set('graphSchema', selectedGraphSchema)
  );

  const loadGraphSchemas = R.compose(dispatch, loadGraphSchemasAsync);

  return {
    handleGraphSchemaChange,
    loadGraphSchemas,
  };
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(GraphSchemas);
