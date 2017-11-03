const R = require('ramda');
const {connect} = require('react-redux');
const LinkEditor = require('../components/ingestion-profile-mapping-link-editor.jsx');

const {
  newLinkSelector,
  newLinkActivePropSelector,
} = require('../selectors/ui/ingestion-profile');

const {
  classLinkKeysSelector,
} = require('../selectors/ingestion-profile');

const {
  toggleNewLinkActivePropValue,
} = require('../action-creators/ui/ingestion-profile');

function mapStateToProps(state) {
  return {
    link: newLinkSelector(state),
    activeLinkProp: newLinkActivePropSelector(state),
    linkTypeOptions: classLinkKeysSelector(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    handleLinkPropValueMenuItemClick: (itemLists, activeItems, depth, item, propKey) => {
    },

    handleLinkPropValueButtonClick: R.compose(dispatch, toggleNewLinkActivePropValue),

    handleCancelButtonClick: R.compose(dispatch),
  };
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(LinkEditor);
