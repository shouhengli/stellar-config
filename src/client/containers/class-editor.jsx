import { compose } from 'ramda';
import { connect } from 'react-redux';
import ClassEditor from '../components/class-editor.jsx';
import {
  classesSelector,
  selectedClassSelector
} from '../selectors/ui/split-view/graph-schema-classes';
import { stagedClassLinksSelector } from '../selectors/ui/split-view/graph-schema-staged-class-links';
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
  deleteAttribute,
  updateLinkSource,
  updateLinkTarget,
  updateLinkName,
  deleteLink
} from '../action-creators/ui/split-view';
import { isEditingSelector } from '../selectors/ui/split-view/graph-schema-staged-classes';

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
    deleteAttribute: compose(dispatch, deleteAttribute),
    updateLinkSource: compose(dispatch, updateLinkSource),
    updateLinkTarget: compose(dispatch, updateLinkTarget),
    updateLinkName: compose(dispatch, updateLinkName),
    deleteLink: compose(dispatch, deleteLink)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ClassEditor);
