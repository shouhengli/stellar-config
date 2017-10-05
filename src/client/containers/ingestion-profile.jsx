const React = require('react');
const {connect} = require('react-redux');

const Sources = require('./ingestion-profile-sources.jsx');
const GraphSchemas = require('./ingestion-profile-graph-schemas.jsx');
const DataTable = require('./ingestion-profile-data-table.jsx');
const SourceDelete = require('./ingestion-profile-source-delete.jsx');
const IngestionProfile = require('../components/ingestion-profile.jsx');

function mapStateToProps(state) {
  const sourceDeleteVisible =
    state.getIn(['ingestionProfile', 'sourceDeleteVisible']);

  const sample = state.getIn(['ingestionProfile', 'sample']);

  return {
    sourceDeleteVisible,
    sample,
  };
}

module.exports = connect(mapStateToProps)((props) => {
  return (
    <IngestionProfile
      Sources={Sources}
      GraphSchemas={GraphSchemas}
      DataTable={DataTable}
      SourceDelete={SourceDelete}
      {...props} />
  );
});
