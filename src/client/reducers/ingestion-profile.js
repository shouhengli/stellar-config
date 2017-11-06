const R = require('ramda');
const {fromJS, is, Map, List} = require('immutable');
const actions = require('../actions');

const {
  CONFIG_STATUS_NORMAL,
  CONFIG_STATUS_CHANGED,
  CONFIG_STATUS_SAVING,
} = require('../config-status');

const {
  defaultToEmptyList,
  defaultToEmptyArray,
  defaultToEmptyObject,
} = require('../util');

const {
  createPersistentClass,
  createPersistentClassLink,
  getClassLinkKey,
} = require('../ingestion-profile');

const initialState = fromJS({
  name: '',
  sources: [],
  status: CONFIG_STATUS_NORMAL,
  graphSchema: {
    classes: {},
    classLinks: {},
  },
  mapping: {
    nodes: [],
    links: [],
  },
});

function loadGraphSchema(graphSchema) {
  return Map(
    R.evolve(
      {
        classes: R.pipe(
          defaultToEmptyArray,
          R.map((cls) => [cls.name, cls]),
          R.fromPairs,
          fromJS
        ),
        classLinks: R.pipe(
          defaultToEmptyArray,
          R.reduce((s, l) => s.set(getClassLinkKey(l), fromJS(l)), Map())
        ),
      },
      defaultToEmptyObject(graphSchema)
    )
  );
}

function updateGraphSchema(graphSchema) {
  return Map(
    R.evolve(
      {
        classes: R.pipe(
          defaultToEmptyArray,
          R.map((cls) => [cls.name, createPersistentClass(cls)]),
          R.fromPairs,
          fromJS
        ),
        classLinks: R.pipe(
          defaultToEmptyArray,
          R.reduce(
            (s, l) => s.set(
              getClassLinkKey(l),
              fromJS(createPersistentClassLink(l))
            ),
            Map()
          )
        ),
      },
      graphSchema
    )
  );
}

function loadMapping(mapping) {
  return Map(
    R.evolve(
      {
        nodes: R.pipe(
          defaultToEmptyArray,
          fromJS
        ),
        links: R.pipe(
          defaultToEmptyArray,
          fromJS
        ),
      },
      mapping
    )
  );
}

function reduce(state = initialState, action) {
  switch (action.type) {
    case actions.INGESTION_PROFILE_LOAD:
      return state
        .set('name', action.name)
        .set('sources', defaultToEmptyList(fromJS(action.content.sources)))
        .set('graphSchema', loadGraphSchema(action.content.graphSchema))
        .set('mapping', loadMapping(action.content.mapping))
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
      return state.set('graphSchema', updateGraphSchema(action));

    case actions.GRAPH_SCHEMA_SET_EDITOR_CONTENT:
      return state.set('status', CONFIG_STATUS_CHANGED);

    case actions.INGESTION_PROFILE_ADD_NEW_NODE:
      return state
        .updateIn(
          ['mapping', 'nodes'],
          List(),
          (nodes) => nodes.push(fromJS(action.node))
        )
        .set('status', CONFIG_STATUS_CHANGED);

    case actions.INGESTION_PROFILE_ADD_NEW_LINK:
      return state
        .updateIn(
          ['mapping', 'links'],
          List(),
          (links) => links.push(fromJS(action.link))
        )
        .set('status', CONFIG_STATUS_CHANGED);

    default:
      return state;
  }
}

module.exports = reduce;
