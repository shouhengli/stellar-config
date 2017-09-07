const React = require('react');
const {connect} = require('react-redux');
const {hideSearch} = require('../action-creators/search');
const {loadEditConfigAsync} = require('../action-creators/edit');

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
      dispatch(loadEditConfigAsync(configType, configName))
        .then(() => dispatch(hideSearch())),
  };
}

module.exports = connect(null, mapDispatchToProps)(Item);
