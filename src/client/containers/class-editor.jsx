import { compose } from 'ramda';
import { connect } from 'react-redux';
import ClassEditor from '../components/class-editor.jsx';
import { classNamesSelector } from '../selectors/ingestion-profile';
import {
  editAttribute,
  editClassName,
  editClassLink,
  saveEdit,
  cancelEdit,
  closeEdit,
  addNewAttribute,
  addNewLink,
  updateClassName
} from '../action-creators/ui/split-view';
import {
  selectedClassSelector,
  relatedClassLinksSelector,
  classAttributeIndexesToEditSelector,
  classLinkIndexesToEditSelector,
  isEditingSelector,
  isEditingClassNameSelector
} from '../selectors/ui/split-view';

function mapStateToProps(state) {
  return {
    selectedClass: selectedClassSelector(state),
    classNames: classNamesSelector(state),
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
    updateClassName: compose(
      dispatch,
      updateClassName,
      event => event.target.textContent
    )
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ClassEditor);
