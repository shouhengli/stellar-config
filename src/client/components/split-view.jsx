import React from 'react';
import ClassList from './class-list.jsx';
import ClassEditor from './class-editor.jsx';
import GraphSchema from '../containers/graph-schema.jsx';
import R from 'ramda';

export default class SplitView extends React.Component {
  render() {
    const {
      classes,
      relatedClassLinks,
      selectedClass,
      classIndexesToEdit,
      classLinkIndexesToEdit,
      handleClassClicked,
      handleCreateNewClass,
      editAttribute,
      editClassLink,
      classNames,
      isEditing,
      saveEdit,
      cancelEdit
     } = this.props;

    return (
      <div className="split-view columns">
        <div key="leftChild" className="view column is-one-fifth">
          <ClassList classes={classes} handleClassClicked={handleClassClicked} handleCreateNewClass={handleCreateNewClass} />
        </div>
        {R.isNil(selectedClass) ? '' : (
          <div
            key="midChild"
            className="view column is-two-fifths">
            <ClassEditor
              selectedClass={selectedClass}
              classIndexesToEdit={classIndexesToEdit}
              classLinkIndexesToEdit={classLinkIndexesToEdit}
              relatedClassLinks={relatedClassLinks}
              editAttribute={editAttribute}
              editClassLink={editClassLink}
              classNames={classNames}
              isEditing={isEditing}
              saveEdit={saveEdit}
              cancelEdit={cancelEdit}
            />
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
