import { compose } from 'ramda';
import { connect } from 'react-redux';
import { classesSelector, classNamesSelector } from '../selectors/ingestion-profile';
import SplitView from '../components/split-view.jsx';
import {
  classSelected,
  addNewClass,
  editAttribute,
  editClassLink,
  saveEdit,
  cancelEdit
} from '../action-creators/ui/split-view';
import {
  selectedClassSelector,
  relatedClassLinksSelector,
  classIndexesToEditSelector,
  classLinkIndexesToEditSelector,
  isEditingSelector
} from '../selectors/ui/split-view';

function mapStateToProps(state) {
  return {
    selectedClass: selectedClassSelector(state),
    classes: classesSelector(state),
    classNames: classNamesSelector(state),
    relatedClassLinks: relatedClassLinksSelector(state),
    classIndexesToEdit: classIndexesToEditSelector(state),
    classLinkIndexesToEdit: classLinkIndexesToEditSelector(state),
    isEditing: isEditingSelector(state)
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    handleClassClicked: compose(dispatch, classSelected),
    handleCreateNewClass: compose(dispatch, addNewClass),
    editAttribute: compose(dispatch, editAttribute),
    editClassLink: compose(dispatch, editClassLink),
    saveEdit: compose(dispatch, saveEdit),
    cancelEdit: compose(dispatch, cancelEdit)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SplitView);
