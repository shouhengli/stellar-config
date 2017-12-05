import React from 'react';
import { connect } from 'react-redux';
import R from 'ramda';
import View from '../components/ingestion-profile-view.jsx';
import SourceView from './ingestion-profile-source-view.jsx';
import MappingView from './ingestion-profile-mapping-view.jsx';
import {
  activeTabSelector,
  samplesSelector
} from '../selectors/ui/ingestion-profile';
import {
  nameSelector,
  sourcesSelector
} from '../selectors/ingestion-profile';
import { loadSamplesAsync } from '../action-creators/ui/ingestion-profile';

function mapStateToProps(state) {
  return {
    name: nameSelector(state),
    activeTab: activeTabSelector(state),
    sources: sourcesSelector(state),
    samples: samplesSelector(state)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    handleWillChangeIngestionProfile: R.compose(dispatch, loadSamplesAsync)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(props => (
  <View SourceView={SourceView} MappingView={MappingView} {...props} />
));
