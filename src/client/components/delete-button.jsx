const React = require('react');

module.exports = ({ handleClick }) => {
  return <button className="delete" onClick={() => handleClick()} />;
};
