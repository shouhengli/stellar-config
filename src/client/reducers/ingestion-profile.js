import R from 'ramda';
import { fromJS, is, Map, List, OrderedMap } from 'immutable';
import actions from '../actions';
import {
  CONFIG_STATUS_NORMAL,
  CONFIG_STATUS_CHANGED,
  CONFIG_STATUS_SAVING
} from '../config-status';
import {
  generateClassGlobalIndex,
  generateClassLinkGlobalIndex,
  generateClassPropGlobalIndex
} from '../ingestion-profile';

const {
  defaultToEmptyList,
  defaultToEmptyArray,
  defaultToEmptyObject
} = require('../util');

// const {
//   createPersistentClass,
//   createPersistentClassLink
// } = require('../ingestion-profile');

const initialState = fromJS({
  name: '',
  sources: [],
  status: CONFIG_STATUS_NORMAL,
  graphSchema: {
    classes: {},
    classLinks: {}
  },
  mapping: {
    nodes: [],
    links: []
  }
});

function loadGraphSchema(graphSchema) {
  return Map(
    R.evolve(
      {
        classes: R.pipe(
          defaultToEmptyArray,
          R.map(cls => ({
            ...cls,
            props: R.reduce(
              (a, e) => {
                const globalIndex = generateClassPropGlobalIndex();
                a[globalIndex] = { globalIndex, name: e[0], type: e[1] };
                return a;
              },
              {},
              Object.entries(cls.props)
            )
          })),
          R.map(cls => ({ ...cls, globalIndex: generateClassGlobalIndex() })),
          R.map(cls => [cls.globalIndex, cls]),
          R.fromPairs,
          fromJS
        ),
        classLinks: R.pipe(
          defaultToEmptyArray,
          R.map(l => ({ ...l, globalIndex: generateClassLinkGlobalIndex() })),
          R.reduce((s, l) => s.set(l.globalIndex, fromJS(l)), Map())
        )
      },
      defaultToEmptyObject(graphSchema)
    )
  );
}

// function updateGraphSchema(graphSchema) {
//   return Map(
//     R.evolve(
//       {
//         classes: R.pipe(
//           defaultToEmptyList,
//           R.map(cls => [cls.get('globalIndex'), createPersistentClass(cls)]),
//           pairs => pairs.toJS(),
//           R.fromPairs,
//           fromJS
//         ),
//         classLinks: R.pipe(
//           defaultToEmptyList,
//           R.reduce(
//             (s, l) =>
//               s.set(l.get('globalIndex'), fromJS(createPersistentClassLink(l))),
//             Map()
//           )
//         )
//       },
//       graphSchema
//     )
//   );
// }

function loadMapping(mapping) {
  return Map(
    R.evolve(
      {
        nodes: R.pipe(
          defaultToEmptyArray,
          R.map(fromJS),
          R.map(OrderedMap),
          List
        ),
        links: R.pipe(
          defaultToEmptyArray,
          R.map(fromJS),
          R.map(OrderedMap),
          List
        )
      },
      mapping
    )
  );
}

export default function reduce(state = initialState, action) {
  switch (action.type) {
    case actions.INGESTION_PROFILE_LOAD:
      return state
        .set('name', action.name)
        .set(
          'sources',
          defaultToEmptyList(fromJS(action.content && action.content.sources))
        )
        .set(
          'graphSchema',
          loadGraphSchema(action.content && action.content.graphSchema)
        )
        .set('mapping', loadMapping(action.content && action.content.mapping))
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
        .set(
          'sources',
          state.get('sources').filterNot(R.curry(is)(action.source))
        )
        .set('status', CONFIG_STATUS_CHANGED);

    case actions.GRAPH_SCHEMA_SET_EDITOR_CONTENT:
      return state.set('status', CONFIG_STATUS_CHANGED);

    case actions.INGESTION_PROFILE_ADD_MAPPING_NODE:
      return state
        .updateIn(['mapping', 'nodes'], List(), nodes =>
          nodes.push(action.node)
        )
        .set('status', CONFIG_STATUS_CHANGED);

    case actions.INGESTION_PROFILE_UPDATE_MAPPING_NODE:
      return state
        .setIn(['mapping', 'nodes', action.index], action.node)
        .set('status', CONFIG_STATUS_CHANGED);

    case actions.INGESTION_PROFILE_DELETE_MAPPING_NODE:
      return state
        .deleteIn(['mapping', 'nodes', action.index])
        .set('status', CONFIG_STATUS_CHANGED);

    case actions.INGESTION_PROFILE_ADD_MAPPING_LINK:
      return state
        .updateIn(['mapping', 'links'], List(), links =>
          links.push(action.link)
        )
        .set('status', CONFIG_STATUS_CHANGED);

    case actions.INGESTION_PROFILE_UPDATE_MAPPING_LINK:
      return state
        .setIn(['mapping', 'links', action.index], action.link)
        .set('status', CONFIG_STATUS_CHANGED);

    case actions.INGESTION_PROFILE_DELETE_MAPPING_LINK:
      return state
        .deleteIn(['mapping', 'links', action.index])
        .set('status', CONFIG_STATUS_CHANGED);

    default:
      return state;
  }
}
