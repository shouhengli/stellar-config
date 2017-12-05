import R from 'ramda';
import { connect } from 'react-redux';
import { classesSelector } from '../selectors/ui/graph-schema-classes';
import SplitView from '../components/split-view.jsx';
import { classSelected } from '../action-creators/ui/split-view';
import { selectedClassSelector, relatedClassLinksSelector } from '../selectors/ui/split-view';

function mapStateToProps(state) {
  return {
    selectedClass: selectedClassSelector(state),
    classes: classesSelector(state).valueSeq(),
    relatedClassLinks: relatedClassLinksSelector(state)
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    handleClassClicked: R.compose(dispatch, classSelected)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SplitView);
