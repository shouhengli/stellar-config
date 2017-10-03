const React = require('react');
const {connect} = require('react-redux');

const Sources = require('./ingestion-profile-sources.jsx');
const GraphSchemas = require('./ingestion-profile-graph-schemas.jsx');
const DataTable = require('../components/ingestion-profile-data-table.jsx');
const IngestionProfile = require('../components/ingestion-profile.jsx');

function mapStateToProps(state) {
  return {};
}

module.exports = connect(mapStateToProps)((props) => {
  return (
    <IngestionProfile
      Sources={Sources}
      GraphSchemas={GraphSchemas}
      DataTable={DataTable}
      {...props} />
  );
});
