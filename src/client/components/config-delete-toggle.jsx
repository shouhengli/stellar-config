const React = require('react');
const {connect} = require('react-redux');
const {revealConfigDelete} = require('../action-creators/edit');

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
      dispatch(revealConfigDelete()),
  };
}

module.exports = connect(null, mapDispatchToProps)(Toggle);
