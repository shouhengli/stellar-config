const {connect} = require('react-redux');
const Search = require('../components/config-search.jsx');

const {
  configNamesSelector,
  searchTextSelector,
} = require('../selectors/search');

const {
  setSearchText,
  hideSearch,
  loadSearchConfigNamesAsync,
} = require('../action-creators/search');

const {loadAsync} = require('../action-creators/ingestion-profile');
const {INGESTION_PROFILE_CONFIG_TYPE} = require('../ingestion-profile');

function mapStateToProps(state) {
  const configNames = configNamesSelector(state);
  const searchText = searchTextSelector;

  return {
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

    handleItemClick: (configName) =>
      dispatch(loadAsync(configName)).then(() => dispatch(hideSearch())),

    handleComponentDidMount: () =>
      dispatch(loadSearchConfigNamesAsync(INGESTION_PROFILE_CONFIG_TYPE)),
  };
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(Search);
