const React = require('react');
const {connect} = require('react-redux');

const Header = ({configType, configName}) => {
  return (
    <div className="tags has-addons">
      <span className="tag is-medium is-primary">
        {configType}
      </span>
      <span className="tag is-medium">
        {configName}
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
