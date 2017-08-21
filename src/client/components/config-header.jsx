const React = require('react');
const {connect} = require('react-redux');

const Header = ({activeConfig}) => {
  return (
    <div>
      <span className="tag">
        {activeConfig.get('type')}
      </span>
      {activeConfig.get('name')}
    </div>
  );
};

function mapStateToProps(state) {
  const activeConfig = state.getIn(['ui', 'activeConfig']);

  return {
    activeConfig,
  };
}

module.exports = connect(mapStateToProps)(Header);
