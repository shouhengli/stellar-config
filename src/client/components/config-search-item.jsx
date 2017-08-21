const React = require('react');
const {connect} = require('react-redux');
const actions = require('../actions');

const Item = ({type, name, handleClick}) => {
  return (
    <div className="panel-block" onClick={() => handleClick(type, name)}>
      <span className="panel-icon">
        <i className="fa fa-book"></i>
      </span>
      {name}
    </div>
  );
};

function mapDispatchToProps(dispatch) {
  return {
    handleClick: (configType, configName) =>
      dispatch(actions.setActiveConfig(configType, configName)),
  };
}

module.exports = connect(null, mapDispatchToProps)(Item);
