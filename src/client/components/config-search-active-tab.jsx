const React = require('react');
const {connect} = require('react-redux');
const actions = require('../actions');

class ActiveTab extends React.Component {
  constructor(props) {
    super(props);
  }

  static get displayName() {
    return 'Active Tab';
  }

  render() {
    return (
      <a className="is-active">{this.props.title}</a>
    );
  }

  componentDidMount() {
    this.props.loadConfigNames(this.props.title);
  }
}

function mapDispatchToProps(dispatch) {
  return {
    loadConfigNames: (configType) =>
      dispatch(actions.loadConfigNamesAsync(configType)),
  };
}

module.exports = connect(null, mapDispatchToProps)(ActiveTab);
