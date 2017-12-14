import { compose } from 'ramda';
import { connect } from 'react-redux';
import { fromJS } from 'immutable';
import { classListSelector } from '../selectors/ui/split-view/graph-schema-classes';
import { classLinksSelector } from '../selectors/ui/split-view/graph-schema-class-links';
import SplitView from '../components/split-view.jsx';
import {
  classSelected,
  editAttribute,
  editClassName,
  editClassLink,
  saveEdit,
  cancelEdit,
  closeEdit,
  addNewAttribute,
  addNewLink,
  addNewClass,
  updateStagedClassLinks
} from '../action-creators/ui/split-view';
import {
  selectedClassSelector,
  attributeIndexesToEditSelector,
  linkIndexesToEditSelector,
  isEditingSelector,
  isEditingClassNameSelector
} from '../selectors/ui/split-view';

function mapStateToProps(state) {
  return {
    selectedClass: selectedClassSelector(state),
    classes: classListSelector(state),
    classLinks: classLinksSelector(state),
    attributeIndexesToEdit: attributeIndexesToEditSelector(state),
    linkIndexesToEdit: linkIndexesToEditSelector(state),
    isEditing: isEditingSelector(state),
    isEditingClassName: isEditingClassNameSelector(state)
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    handleClassClicked: compose(dispatch, classSelected),
    handleCreateNewClass: () => {
      const newClass = fromJS({
        name: 'New Class',
        props: { newAttribute: '' }
      });
      dispatch(addNewClass(newClass));
      dispatch(classSelected(newClass));
      dispatch(editAttribute(0));
      dispatch(editClassName());
    },
    editAttribute: compose(dispatch, editAttribute),
    editClassLink: compose(dispatch, editClassLink),
    editClassName: compose(dispatch, editClassName),
    saveEdit: compose(dispatch, saveEdit),
    cancelEdit: compose(dispatch, cancelEdit),
    closeEdit: compose(dispatch, closeEdit),
    addNewAttribute: compose(dispatch, addNewAttribute),
    addNewLink: compose(dispatch, addNewLink),
    updateStagedClassLinks: compose(dispatch, updateStagedClassLinks)
  };
}

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  ...stateProps,
  ...dispatchProps,
  handleClassClicked(cls) {
    dispatchProps.handleClassClicked(cls);
    dispatchProps.updateStagedClassLinks(cls, stateProps.classLinks);
  }
});

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(
  SplitView
);
