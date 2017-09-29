const {fromJS} = require('immutable');
const actions = require('../actions');

const initialEditState = fromJS({
  selectedSource: null,
  newSource: '',
});

function reduceIngestionProfileState(state = initialEditState, action) {
  switch (action.type) {
    case actions.SET_INGESTION_PROFILE_SELECTED_SOURCE:
      return state.set('selectedSource', action.selectedSource);

    case actions.SET_INGESTION_PROFILE_NEW_SOURCE:
      return state.set('newSource', action.newSource);

    default:
      return state;
  }
}

module.exports = reduceIngestionProfileState;
