const React = require('react');

module.exports = ({type, name, handleClick}) => {
  return (
    <div className="panel-block" onClick={() => handleClick(type, name)}>
      <span className="panel-icon">
        <i className="fa fa-book"></i>
      </span>
      {name}
    </div>
  );
};
