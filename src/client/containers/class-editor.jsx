import { compose } from 'ramda';
import { connect } from 'react-redux';
import ClassEditor from '../components/class-editor.jsx';
import { classListSelector } from '../selectors/ui/graph-schema-classes';
import { relatedClassLinksSelector } from '../selectors/ui/graph-schema-class-links';
import {
  editAttribute,
  editClassName,
  editClassLink,
  saveEdit,
  cancelEdit,
  closeEdit,
  addNewAttribute,
  addNewLink,
  updateClassName,
  updateAttributeType,
  updateAttributeName,
  deleteAttribute
} from '../action-creators/ui/split-view';
import {
  selectedClassSelector,
  classAttributeIndexesToEditSelector,
  classLinkIndexesToEditSelector,
  isEditingSelector,
  isEditingClassNameSelector
} from '../selectors/ui/split-view';

function mapStateToProps(state) {
  return {
    selectedClass: selectedClassSelector(state),
    classes: classListSelector(state),
    relatedClassLinks: relatedClassLinksSelector(state),
    classAttributeIndexesToEdit: classAttributeIndexesToEditSelector(state),
    classLinkIndexesToEdit: classLinkIndexesToEditSelector(state),
    isEditing: isEditingSelector(state),
    isEditingClassName: isEditingClassNameSelector(state)
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    editAttribute: compose(dispatch, editAttribute),
    editClassLink: compose(dispatch, editClassLink),
    editClassName: compose(dispatch, editClassName),
    saveEdit: compose(dispatch, saveEdit),
    cancelEdit: compose(dispatch, cancelEdit),
    closeEdit: compose(dispatch, closeEdit),
    addNewAttribute: compose(dispatch, addNewAttribute),
    addNewLink: compose(dispatch, addNewLink),
    updateClassName: compose(dispatch, updateClassName),
    updateAttributeType: compose(dispatch, updateAttributeType),
    updateAttributeName: compose(dispatch, updateAttributeName),
    deleteAttribute: compose(dispatch, deleteAttribute)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ClassEditor);
