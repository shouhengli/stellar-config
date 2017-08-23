const React = require('react');
const {connect} = require('react-redux');
const actions = require('../actions');

const Close = ({handleClick}) => {
  return (
    <span className="icon is-small" onClick={() => handleClick()}>
      <i className="fa fa-caret-left"></i>
    </span>
  );
};

function mapDispatchToProps(dispatch) {
  return {
    handleClick: () =>
      dispatch(actions.hideSearch()),
  };
}

module.exports = connect(null, mapDispatchToProps)(Close);
