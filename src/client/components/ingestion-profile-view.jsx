import React from 'react';
import SplitView from '../containers/split-view.jsx';

const {
  TAB_SOURCE,
  TAB_GRAPH_SCHEMA,
  TAB_MAPPING
} = require('../ingestion-profile');

const { isNotEmpty } = require('../util');

export default class IngestionProfileView extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      name,
      activeTab,
      SourceView,
      MappingView
    } = this.props;

    if (isNotEmpty(name)) {
      switch (activeTab) {
        case TAB_SOURCE:
          return <SourceView />;
        case TAB_GRAPH_SCHEMA:
          return (
            <SplitView />
          );
        case TAB_MAPPING:
          return <MappingView />;
      }
    }

    return null;
  }

  componentDidUpdate() {
    if (this.props.samples.isEmpty() && !this.props.sources.isEmpty()) {
      this.props.handleWillChangeIngestionProfile(this.props.sources);
    }
  }
}
