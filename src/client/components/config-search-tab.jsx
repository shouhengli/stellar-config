const React = require('react');

module.exports = ({title, handleClick}) =>
  <a onClick={() => handleClick(title)}>{title}</a>;
