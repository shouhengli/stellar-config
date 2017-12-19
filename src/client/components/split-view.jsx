import React from 'react';
import ClassList from '../containers/class-list.jsx';
import ClassEditor from '../containers/class-editor.jsx';
import GraphSchema from '../containers/graph-schema.jsx';
import R from 'ramda';

export default class SplitView extends React.Component {
  render() {
    const { selectedClass } = this.props;

    return (
      <div className="split-view columns">
        <div key="leftChild" className="view column is-one-fifth">
          <ClassList />
        </div>
        {R.isNil(selectedClass) ? (
          ''
        ) : (
          <div key="midChild" className="view column is-two-fifths">
            <ClassEditor />
          </div>
        )}
        <div key="rightChild" className="view column">
          <GraphSchema />
        </div>
      </div>
    );
  }

  componentWillMount() {
    this.props.init(this.props.classes, this.props.classLinks);
  }
}
