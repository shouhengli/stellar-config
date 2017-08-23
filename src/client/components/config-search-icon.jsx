const React = require('react');
const {connect} = require('react-redux');
const actions = require('../actions');

const Icon = ({handleClick}) => {
  return (
    <span className="icon is-small" onClick={() => handleClick()}>
      <i className="fa fa-search"></i>
    </span>
  );
};

function mapDispatchToProps(dispatch) {
  return {
    handleClick: () =>
      dispatch(actions.revealSearch()),
  };
}

module.exports = connect(null, mapDispatchToProps)(Icon);
