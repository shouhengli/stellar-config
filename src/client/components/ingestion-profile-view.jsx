const React = require('react');
const FullView = require('./full-view.jsx');

const {
  TAB_SOURCE,
} = require('../ingestion-profile');

const {isNotEmpty} = require('../util');

module.exports = ({name, activeTab, SourceView}) => {
  if (isNotEmpty(name)) {
    switch (activeTab) {
      case TAB_SOURCE:
        return <FullView><SourceView /></FullView>;
    }
  }

  return null;
};
