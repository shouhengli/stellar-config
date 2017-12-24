import { connect } from 'react-redux';
import SplitView from '../components/split-view.jsx';
import { selectedClassSelector } from '../selectors/ui/split-view/graph-schema-classes';
import { compose } from 'ramda';
import {
  classLinksSelector,
  classesSelector
} from '../selectors/ingestion-profile';
import { loadGraphSchemaContent } from '../action-creators/ingestion-profile';

const mapStateToProps = state => {
  return {
    selectedClass: selectedClassSelector(state),
    classes: classesSelector(state),
    classLinks: classLinksSelector(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadGraphSchemaContent: compose(dispatch, loadGraphSchemaContent)
  };
};

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  ...stateProps,
  ...dispatchProps,
  loadGraphSchemaContent() {
    const { classes, classLinks } = stateProps;
    dispatchProps.loadGraphSchemaContent(classes, classLinks);
  }
});

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(
  SplitView
);
