const {fromJS, List} = require('immutable');
const actions = require('../actions');

const initialIngestionProfileState = fromJS({
  selectedSource: '',
  newSource: '',
  newSourceVisible: false,
  graphSchemas: List(),
  sourceDeleteVisible: false,
  sample: null,
});

function reduceIngestionProfileState(
  state = initialIngestionProfileState,
  action
) {
  switch (action.type) {
    case actions.SET_INGESTION_PROFILE_SELECTED_SOURCE:
      return state.set('selectedSource', action.selectedSource);

    case actions.SET_INGESTION_PROFILE_NEW_SOURCE:
      return state.set('newSource', action.newSource);

    case actions.HIDE_INGESTION_PROFILE_NEW_SOURCE:
      return state.set('newSourceVisible', false);

    case actions.REVEAL_INGESTION_PROFILE_NEW_SOURCE:
      return state.set('newSourceVisible', true);

    case actions.LOAD_INGESTION_PROFILE_GRAPH_SCHEMAS:
      return state.set('graphSchemas', List(action.graphSchemas));

    case actions.LOAD_INGESTION_PROFILE_SAMPLE:
      return state.set('sample', fromJS(action.sample));

    case actions.HIDE_INGESTION_PROFILE_SOURCE_DELETE:
      return state.set('sourceDeleteVisible', false);

    case actions.REVEAL_INGESTION_PROFILE_SOURCE_DELETE:
      return state.set('sourceDeleteVisible', true);

    default:
      return state;
  }
}

module.exports = reduceIngestionProfileState;
