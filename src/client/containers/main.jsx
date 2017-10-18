const React = require('react');
const {connect} = require('react-redux');
const Main = require('../components/main.jsx');
const Nav = require('./ingestion-profile-nav.jsx');
const View = require('./ingestion-profile-view.jsx');

module.exports = connect()(() =>
  <Main Nav={Nav} View={View} />
);
