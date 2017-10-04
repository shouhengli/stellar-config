const {connect} = require('react-redux');
const DataTable = require('../components/ingestion-profile-data-table.jsx');
const {defaultToEmptyMap} = require('../util');

function mapStateToProps(state) {
  const sample = defaultToEmptyMap(
    state.getIn(['ingestionProfile', 'sample'])
  );

  return {sample};
}

module.exports = connect(mapStateToProps)(DataTable);
