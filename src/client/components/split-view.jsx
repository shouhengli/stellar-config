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
      editClassName,
      editClassLink,
      classNames,
      isEditing,
      isEditingClassName,
      saveEdit,
      cancelEdit,
      closeEdit,
      addNewAttribute,
      addNewLink
    } = this.props;

    return (
      <div className="split-view columns">
        <div key="leftChild" className="view column is-one-fifth">
          <ClassList
            classes={classes}
            handleClassClicked={handleClassClicked}
            handleCreateNewClass={handleCreateNewClass}
            isEditing={isEditing}
            selectedClass={selectedClass}
          />
        </div>
        {R.isNil(selectedClass) ? (
          ''
        ) : (
          <div key="midChild" className="view column is-two-fifths">
            <ClassEditor
              selectedClass={selectedClass}
              classIndexesToEdit={classIndexesToEdit}
              classLinkIndexesToEdit={classLinkIndexesToEdit}
              relatedClassLinks={relatedClassLinks}
              editAttribute={editAttribute}
              editClassName={editClassName}
              editClassLink={editClassLink}
              classNames={classNames}
              isEditing={isEditing}
              isEditingClassName={isEditingClassName}
              saveEdit={saveEdit}
              cancelEdit={cancelEdit}
              closeEdit={closeEdit}
              addNewAttribute={addNewAttribute}
              addNewLink={addNewLink}
            />
          </div>
        )}
        <div key="rightChild" className="view column">
          <GraphSchema />
        </div>
      </div>
    );
  }
}
