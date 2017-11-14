const {fromJS} = require('immutable');
const actions = require('../../actions');
const {INGESTION_PROFILE} = require('../../views');

const initialState = fromJS({
  activeView: INGESTION_PROFILE,
});

function reduce(state = initialState, action) {
  switch (action.type) {
    case actions.VIEW_CHANGE:
      return state.set('activeView', action.view);
    default:
      return state;
  }
}

module.exports = reduce;
