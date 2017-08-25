const React = require('react');
const {connect} = require('react-redux');
const actions = require('../actions');

const Toggle = ({handleClick}) => {
  return (
    <button className="button is-white" onClick={() => handleClick()}>
      <span className="icon is-small">
        <i className="fa fa-trash"></i>
      </span>
    </button>
  );
};

function mapDispatchToProps(dispatch) {
  return {
    handleClick: () =>
      dispatch(actions.revealConfigDelete()),
  };
}

module.exports = connect(null, mapDispatchToProps)(Toggle);
