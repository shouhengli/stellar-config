import { compose } from 'ramda';
import { connect } from 'react-redux';
import { classesSelector } from '../selectors/ui/split-view/graph-schema-classes';
import ClassList from '../components/class-list.jsx';
import {
  classSelected,
  addNewClass,
  deleteClass
} from '../action-creators/ui/split-view';
import { isEditingSelector } from '../selectors/ui/split-view/graph-schema-staged-classes';

function mapStateToProps(state) {
  return {
    classes: classesSelector(state),
    isEditing: isEditingSelector(state)
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    handleClassClicked: compose(dispatch, classSelected),
    handleCreateNewClass: compose(dispatch, addNewClass),
    handleDeleteClass: compose(dispatch, deleteClass)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ClassList);
