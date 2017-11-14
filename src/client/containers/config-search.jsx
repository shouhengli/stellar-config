const R = require('ramda');
const {connect} = require('react-redux');
const Search = require('../components/config-search.jsx');

const {
  namesSelector,
  textSelector,
} = require('../selectors/ui/search');

const {
  hideSearch,
  loadSearchNamesAsync,
  setSearchText,
} = require('../action-creators/ui/search');

const {loadAsync} = require('../action-creators/ingestion-profile');
const {INGESTION_PROFILE_CONFIG_TYPE} = require('../ingestion-profile');

function mapStateToProps(state) {
  return {
    names: namesSelector(state),
    text: textSelector(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    handleHideButtonClick: R.compose(dispatch, hideSearch),

    handleSearchTextChange: R.compose(dispatch, setSearchText),

    handleItemClick: R.pipeP(
      R.compose(dispatch, loadAsync),
      R.compose(dispatch, hideSearch)
    ),

    handleComponentDidMount: R.compose(
      dispatch,
      loadSearchNamesAsync,
      R.always(INGESTION_PROFILE_CONFIG_TYPE)
    ),
  };
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(Search);
