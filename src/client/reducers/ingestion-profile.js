const {fromJS, List} = require('immutable');
const actions = require('../actions');

const initialEditState = fromJS({
  selectedSource: null,
  newSource: '',
  graphSchemas: List(),
});

function reduceIngestionProfileState(state = initialEditState, action) {
  switch (action.type) {
    case actions.SET_INGESTION_PROFILE_SELECTED_SOURCE:
      return state.set('selectedSource', action.selectedSource);

    case actions.SET_INGESTION_PROFILE_NEW_SOURCE:
      return state.set('newSource', action.newSource);

    case actions.LOAD_INGESTION_PROFILE_GRAPH_SCHEMAS:
      return state.set('graphSchemas', List(action.graphSchemas));

    case actions.LOAD_INGESTION_PROFILE_SAMPLE:
      return state.set('sample', fromJS(action.sample));

    default:
      return state;
  }
}

module.exports = reduceIngestionProfileState;
