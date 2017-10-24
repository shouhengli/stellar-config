const React = require('react');
const SplitView = require('./split-view.jsx');

const {
  TAB_SOURCE,
  TAB_GRAPH_SCHEMA,
  TAB_MAPPING,
} = require('../ingestion-profile');

const {isNotEmpty} = require('../util');

module.exports = ({name, activeTab, SourceView, GraphSchema, ConfigEditor, MappingView}) => {
  if (isNotEmpty(name)) {
    switch (activeTab) {
      case TAB_SOURCE:
        return <SourceView />;
      case TAB_GRAPH_SCHEMA:
        return <SplitView><ConfigEditor /><GraphSchema /></SplitView>;
      case TAB_MAPPING:
        return <MappingView />;
    }
  }

  return null;
};
