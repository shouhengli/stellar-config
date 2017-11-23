const React = require('react');
const R = require('ramda');

module.exports = ({ source, name }) =>
  R.isNil(source) || R.isNil(name) ? (
    <span>(None)</span>
  ) : (
    [
      <span key="class">{source}</span>,
      <span key="class-icon" className="icon">
        <i className="fa fa-caret-right" />
      </span>,
      <span key="link">{name}</span>
    ]
  );
