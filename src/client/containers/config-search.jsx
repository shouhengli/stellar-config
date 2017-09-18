const {List} = require('immutable');
const {connect} = require('react-redux');

const ConfigSearch = require('../components/config-search.jsx');

const {setSearchText, hideSearch} = require('../action-creators/search');

function mapStateToProps(state) {
  const configTypes = state.getIn(['search', 'types']);
  const activeConfigType = state.getIn(['search', 'activeType']);
  const configNames = state.getIn(['search', 'names'], List());
  const searchText = state.getIn(['search', 'text']);

  return {
    configTypes,
    activeConfigType,
    configNames,
    searchText,
  };
}

function mapDispatchToProps(dispatch) {
  const handleHideButtonClick = () => dispatch(hideSearch());
  const handleSearchTextChange =
    (event) => dispatch(setSearchText(event.target.value));

  return {
    handleHideButtonClick,
    handleSearchTextChange,
  };
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(ConfigSearch);
