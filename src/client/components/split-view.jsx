import React from 'react';
import ClassList from './class-list.jsx';
import ClassEditor from './class-editor.jsx';
import GraphSchema from '../containers/graph-schema.jsx';
import R from 'ramda';

export default class SplitView extends React.Component {
  render() {
    const { classes, relatedClassLinks, selectedClass, handleClassClicked } = this.props;

    return (
      <div className="split-view columns">
        <div key="leftChild" className="view column is-one-fifth">
          <ClassList classes={classes} handleClassClicked={handleClassClicked} />
        </div>
        {R.isNil(selectedClass) ? '' : (
          <div
            key="midChild"
            className="view column is-half">
            <ClassEditor selectedClass={selectedClass} relatedClassLinks={relatedClassLinks} />
          </div>
        )}
        <div
          key="rightChild" className="view column">
          <GraphSchema />
        </div>
      </div>
    );
  }
}
