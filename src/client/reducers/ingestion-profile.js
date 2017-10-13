const {fromJS} = require('immutable');
const actions = require('../actions');

const {
  CONFIG_STATUS_NORMAL,
  CONFIG_STATUS_CHANGED,
  CONFIG_STATUS_SAVING,
} = require('../config-status');

const initialState = fromJS({
  name: '',
  sources: [],
  status: CONFIG_STATUS_NORMAL,
  graphSchema: {
    classes: {},
    classLinks: {},
  },
});

function reduce(state = initialState, action) {
  switch (action.type) {
    case actions.INGESTION_PROFILE_LOAD:
      return state
        .set('name', action.name)
        .set('sources', fromJS(action.content.sources))
        .set('status', CONFIG_STATUS_NORMAL);

    case actions.INGESTION_PROFILE_SAVE:
      return state.set('status', CONFIG_STATUS_SAVING);

    case actions.INGESTION_PROFILE_SAVE_SUCCESS:
      return state.set('status', CONFIG_STATUS_NORMAL);

    case actions.INGESTION_PROFILE_RESET:
      return initialState;

    case actions.INGESTION_PROFILE_ADD_SOURCE:
      return state
        .set('sources', state.get('sources').push(action.source))
        .set('status', CONFIG_STATUS_CHANGED);

    case actions.GRAPH_SCHEMA_LOAD_ELEMENTS:
      return state.set('graphSchema', fromJS({
        classes: action.classes,
        classLinks: action.classLinks,
      }));

    default:
      return state;
  }
}

module.exports = reduce;
