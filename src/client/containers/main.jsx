const R = require('ramda');
const React = require('react');
const { connect } = require('react-redux');
const Main = require('../components/main.jsx');
const Nav = require('./ingestion-profile-nav.jsx');
const View = require('./ingestion-profile-view.jsx');
const { initLayoutAsync } = require('../action-creators/ui/graph-schema');

function mapDispatchToProps(dispatch) {
  return {
    handleComponentDidMount: R.compose(dispatch, initLayoutAsync)
  };
}

module.exports = connect(null, mapDispatchToProps)(props => (
  <Main Nav={Nav} View={View} {...props} />
));
