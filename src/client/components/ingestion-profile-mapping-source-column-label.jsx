const React = require('react');
const R = require('ramda');
const { isNotEmpty } = require('../util');

module.exports = R.ifElse(
  ({ source, column }) => isNotEmpty(source) && isNotEmpty(column),
  ({ source, column }) => [
    <span key="column-icon" className="icon">
      <i className="fa fa-columns" />
    </span>,
    <span key="column">{column}</span>,
    <span key="source-icon" className="icon">
      <i className="fa fa-file-o" />
    </span>,
    <span key="source">{source}</span>
  ],
  () => <span>(None)</span>
);
