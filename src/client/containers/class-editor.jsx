import { compose } from 'ramda';
import { connect } from 'react-redux';
import ClassEditor from '../components/class-editor.jsx';
import { classesSelector } from '../selectors/ui/split-view/graph-schema-classes';
import { stagedClassLinksSelector } from '../selectors/ui/split-view/graph-schema-class-links';
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
  isEditingSelector
} from '../selectors/ui/split-view/graph-schema-classes';

function mapStateToProps(state) {
  return {
    selectedClass: selectedClassSelector(state),
    classes: classesSelector(state),
    stagedClassLinks: stagedClassLinksSelector(state),
    isEditing: isEditingSelector(state)
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
