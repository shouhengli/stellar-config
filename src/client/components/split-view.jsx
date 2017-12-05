import React from 'react';
import ClassList from './class-list.jsx';
import ClassEditor from './class-editor.jsx';
import GraphSchema from '../containers/graph-schema.jsx';

export default class SplitView extends React.Component {
  render() {
    const { classes, selectedClass, handleClassClicked } = this.props;
    const rightChildClassName = `view column ${selectedClass ? 'is-two-fifths' : 'is-four-fifths'} is-pulled-right`;

    return (
      <div className="split-view">
        <div key="leftChild" className="view column is-one-fifth is-pulled-left">
          <ClassList classes={classes} handleClassClicked={handleClassClicked} />
        </div>
        {selectedClass ? (
          <div
            key="midChild"
            className="view column is-two-fifths is-pulled-left">
            <ClassEditor />
          </div>
        ) : (
            ''
          )}
        <div
          key="rightChild" className={rightChildClassName}>
          <GraphSchema />
        </div>
      </div>
    );
  }
}
