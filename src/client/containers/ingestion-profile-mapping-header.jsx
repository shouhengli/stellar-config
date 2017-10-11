const {connect} = require('react-redux');
const selectors = require('../selectors/ingestion-profile');

const MappingHeader = require('../components/ingestion-profile-mapping-header.jsx');

function mapStateToProps(state) {
  const classNames = selectors.getClassNames(state);

  return {
    classNames,
  };
}

module.exports = connect(mapStateToProps)(MappingHeader);
