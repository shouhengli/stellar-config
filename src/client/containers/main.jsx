import R from 'ramda';
import React from 'react';
import { connect } from 'react-redux';
import Main from '../components/main.jsx';
import Nav from './ingestion-profile-nav.jsx';
import View from './ingestion-profile-view.jsx';
import { initLayoutAsync } from '../action-creators/ui/split-view/graph-schema';

function mapDispatchToProps(dispatch) {
  return {
    handleComponentDidMount: R.compose(dispatch, initLayoutAsync)
  };
}

export default connect(null, mapDispatchToProps)(props => (
  <Main Nav={Nav} View={View} {...props} />
));
