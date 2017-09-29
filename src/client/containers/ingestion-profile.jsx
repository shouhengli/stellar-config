const React = require('react');

const Sources = require('../components/ingestion-profile-sources.jsx');
const GraphSchemas = require('../components/ingestion-profile-graph-schemas.jsx');
const DataTable = require('../components/ingestion-profile-data-table.jsx');
const IngestionProfile = require('../components/ingestion-profile.jsx');

module.exports = (props) => {
  return (
    <IngestionProfile
      Sources={Sources}
      GraphSchemas={GraphSchemas}
      DataTable={DataTable}
      {...props} />
  );
};
