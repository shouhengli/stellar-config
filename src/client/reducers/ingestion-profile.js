const R = require('ramda');
const {fromJS, is} = require('immutable');
const actions = require('../actions');

const {
  CONFIG_STATUS_NORMAL,
  CONFIG_STATUS_CHANGED,
  CONFIG_STATUS_SAVING,
} = require('../config-status');

const {
  defaultToEmptyList,
  defaultToEmptyMap,
} = require('../util');

const {
  createPersistentClass,
  createPersistentClassLink,
} = require('../graph-schema');

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
        .set('sources', defaultToEmptyList(fromJS(action.content.sources)))
        .set('graphSchema', defaultToEmptyMap(fromJS(action.content.graphSchema)))
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

    case actions.INGESTION_PROFILE_DELETE_SOURCE:
      return state
        .set('sources', state.get('sources').filterNot(R.curry(is)(action.source)))
        .set('status', CONFIG_STATUS_CHANGED);

    case actions.GRAPH_SCHEMA_UPDATE_CONTENT:
      return state.set('graphSchema', fromJS({
        classes: R.defaultTo([], action.classes).map(createPersistentClass),
        classLinks: R.defaultTo([], action.classLinks).map(createPersistentClassLink),
      }));

    case actions.GRAPH_SCHEMA_SET_EDITOR_CONTENT:
      return state.set('status', CONFIG_STATUS_CHANGED);

    default:
      return state;
  }
}

module.exports = reduce;
