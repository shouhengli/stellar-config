const React = require('react');

module.exports = ({name, handleClick}) => {
  return (
    <div className="panel-block" onClick={() => handleClick(name)}>
      <span className="panel-icon">
        <i className="fa fa-book"></i>
      </span>
      {name}
    </div>
  );
};
