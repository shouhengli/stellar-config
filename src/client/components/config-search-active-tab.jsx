const React = require('react');

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

module.exports = ActiveTab;
