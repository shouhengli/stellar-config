const React = require('react');
const {connect} = require('react-redux');
const Main = require('../components/main.jsx');
const Nav = require('./ingestion-profile-nav.jsx');

module.exports = connect()(() =>
  <Main Nav={Nav} View="div" />
);
