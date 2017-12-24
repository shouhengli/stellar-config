import { compose } from 'ramda';
import { connect } from 'react-redux';
import ClassEditor from '../components/class-editor.jsx';
import {
  classesSelector,
  selectedClassSelector
} from '../selectors/ui/split-view/graph-schema-classes';
import { stagedClassLinksSelector } from '../selectors/ui/split-view/graph-schema-staged-class-links';
import { classLinksSelector } from '../selectors/ui/split-view/graph-schema-class-links';
import { isEditingSelector } from '../selectors/ui/split-view/graph-schema-staged-classes';
import { nameSelector } from '../selectors/ingestion-profile';
import {
  editAttribute,
  editClassName,
  editClassLink,
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
import { saveGraphSchema } from '../action-creators/ingestion-profile';

function mapStateToProps(state) {
  return {
    selectedClass: selectedClassSelector(state),
    classes: classesSelector(state),
    classLinks: classLinksSelector(state),
    stagedClassLinks: stagedClassLinksSelector(state),
    isEditing: isEditingSelector(state),
    profileName: nameSelector(state)
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    editAttribute: compose(dispatch, editAttribute),
    editClassLink: compose(dispatch, editClassLink),
    editClassName: compose(dispatch, editClassName),
    saveGraphSchema: compose(dispatch, saveGraphSchema),
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

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  ...stateProps,
  ...dispatchProps,
  saveGraphSchema() {
    const { profileName, classes, classLinks } = stateProps;
    dispatchProps.saveGraphSchema(profileName, classes, classLinks);
  },
  cancelEdit() {
    ownProps.loadGraphSchemaContent();
  }
});

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(
  ClassEditor
);
