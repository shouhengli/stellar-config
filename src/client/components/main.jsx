import React from 'react';

export default class Main extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { Nav, View } = this.props;

    return [<Nav key="nav" />, <View key="view" />];
  }

  componentDidMount() {
    this.props.handleComponentDidMount();
  }
}
