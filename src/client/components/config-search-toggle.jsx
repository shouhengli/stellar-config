const React = require('react');
const {connect} = require('react-redux');
const {revealSearch} = require('../action-creators/search');

const Toggle = ({handleClick}) => {
  return (
    <button className="button is-white" onClick={() => handleClick()}>
      <span className="icon is-small">
        <i className="fa fa-search"></i>
      </span>
    </button>
  );
};

function mapDispatchToProps(dispatch) {
  return {
    handleClick: () =>
      dispatch(revealSearch()),
  };
}

module.exports = connect(null, mapDispatchToProps)(Toggle);
