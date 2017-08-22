const React = require('react');
const {connect} = require('react-redux');

const Header = ({configType, configName}) => {
  return (
    <div>
      {configName}
      <span className="tag">
        {configType}
      </span>
    </div>
  );
};

function mapStateToProps(state) {
  const configType = state.getIn(['edit', 'type']);
  const configName = state.getIn(['edit', 'name']);

  return {
    configType,
    configName,
  };
}

module.exports = connect(mapStateToProps)(Header);
