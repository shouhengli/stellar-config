const React = require('react');
const {connect} = require('react-redux');
const {loadSearchConfigNamesAsync} = require('../action-creators/search');

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

  componentWillMount() {
    this.props.loadConfigNames(this.props.title);
  }
}

function mapDispatchToProps(dispatch) {
  return {
    loadConfigNames: (configType) =>
      dispatch(loadSearchConfigNamesAsync(configType)),
  };
}

module.exports = connect(null, mapDispatchToProps)(ActiveTab);
