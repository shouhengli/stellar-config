import React from 'react';
import R from 'ramda';
import { connect } from 'react-redux';
import Nav from '../components/ingestion-profile-nav.jsx';
import Search from './config-search.jsx';
import New from './config-new.jsx';
import Delete from './config-delete.jsx';
import { saveAsync } from '../action-creators/ingestion-profile';
import {
  revealNew,
  revealDelete,
  setActiveTab
} from '../action-creators/ui/ingestion-profile';
import { revealSearch } from '../action-creators/ui/search';
import {
  nameSelector,
  statusSelector,
  persistentIngestionProfileSelector
} from '../selectors/ingestion-profile';
import { visibleSelector as searchVisibleSelector } from '../selectors/ui/search';
import {
  newVisibleSelector,
  deleteVisibleSelector,
  activeTabSelector
} from '../selectors/ui/ingestion-profile';

function mapStateToProps(state) {
  return {
    name: nameSelector(state),
    content: persistentIngestionProfileSelector(state),
    status: statusSelector(state),
    searchVisible: searchVisibleSelector(state),
    newVisible: newVisibleSelector(state),
    deleteVisible: deleteVisibleSelector(state),
    activeTab: activeTabSelector(state)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    handleSaveClick: R.compose(dispatch, saveAsync),

    handleSearchToggleClick: R.compose(dispatch, revealSearch),

    handleNewToggleClick: R.compose(dispatch, revealNew),

    handleDeleteToggleClick: R.compose(dispatch, revealDelete),

    handleTabClick: R.compose(dispatch, setActiveTab)
  };
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(props => (
  <Nav Search={Search} New={New} Delete={Delete} {...props} />
));
