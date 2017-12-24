import { compose } from 'ramda';
import { connect } from 'react-redux';
import {
  classesSelector,
  selectedClassIndexSelector
} from '../selectors/ui/split-view/graph-schema-classes';
import { nameSelector } from '../selectors/ingestion-profile';
import { classLinksSelector } from '../selectors/ui/split-view/graph-schema-class-links';
import ClassList from '../components/class-list.jsx';
import { classSelected, addNewClass } from '../action-creators/ui/split-view';
import { isEditingSelector } from '../selectors/ui/split-view/graph-schema-staged-classes';
import { saveGraphSchema } from '../action-creators/ingestion-profile';
import { generateClassGlobalIndex } from '../ingestion-profile';
import { fromJS } from 'immutable';

function mapStateToProps(state) {
  return {
    selectedClassIndex: selectedClassIndexSelector(state),
    classes: classesSelector(state),
    classLinks: classLinksSelector(state),
    profileName: nameSelector(state),
    isEditing: isEditingSelector(state)
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    handleClassClicked: compose(dispatch, classSelected),
    handleCreateNewClass: compose(dispatch, addNewClass),
    saveGraphSchema: compose(dispatch, saveGraphSchema)
  };
}

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  ...stateProps,
  ...dispatchProps,
  handleDeleteClass(cls) {
    const { profileName, classes, classLinks } = stateProps;
    dispatchProps.saveGraphSchema(
      profileName,
      classes.delete(cls.get('globalIndex')),
      classLinks.map(l =>
        l.set(
          'isDeleted',
          [l.get('sourceIndex'), l.get('targetIndex')].includes(
            cls.get('globalIndex')
          )
        )
      )
    );
  },
  handleCreateNewClass() {
    const globalIndex = generateClassGlobalIndex();
    dispatchProps.handleCreateNewClass(
      fromJS({
        name: 'NewClass',
        props: {},
        globalIndex,
        isEditingName: true
      })
    );
  }
});

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(
  ClassList
);
