import { fromJS, Map, List, OrderedMap } from 'immutable';
import reduceState from '../ingestion-profile';
import actions from '../../actions';
import {
  CONFIG_STATUS_NORMAL,
  CONFIG_STATUS_CHANGED
} from '../../config-status';

describe('reducer ingestion-profile', () => {
  let initialState;

  beforeEach(() => {
    initialState = fromJS({
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
  });

  describe('when INGESTION_PROFILE_LOAD', () => {
    it('updates name in new state', () => {
      const action = {
        type: actions.INGESTION_PROFILE_LOAD,
        name: 'default'
      };
      const next = reduceState(initialState, action);

      expect(next.get('name')).toEqual(action.name);
    });

    it('updates sources in new state', () => {
      const action = {
        type: actions.INGESTION_PROFILE_LOAD,
        content: {
          sources: ['a.csv', 'b.csv']
        }
      };

      const next = reduceState(initialState, action);

      expect(next.get('sources')).toEqual(fromJS(action.content.sources));
    });

    it('set sources to an empty list in new state if not provided in action', () => {
      const action = {
        type: actions.INGESTION_PROFILE_LOAD
      };
      const next = reduceState(initialState, action);

      expect(next.get('sources')).toEqual(fromJS([]));
    });

    it('updates graphSchema in new state', () => {
      const action = {
        type: actions.INGESTION_PROFILE_LOAD,
        content: {
          graphSchema: {
            classes: [{ name: 'class1' }],
            classLinks: [{ name: 'name1', source: 'source1' }]
          }
        }
      };

      const next = reduceState(initialState, action);

      expect(
        next.get('graphSchema').equals(
          fromJS({
            classes: { class1: action.content.graphSchema.classes[0] },
            classLinks: Map().set(
              fromJS(action.content.graphSchema.classLinks[0]),
              fromJS(action.content.graphSchema.classLinks[0])
            )
          })
        )
      ).toBeTruthy();
    });

    it('set graphSchema to an empty map in new state if not provided in action', () => {
      const action = {
        type: actions.INGESTION_PROFILE_LOAD
      };
      const next = reduceState(initialState, action);

      expect(next.get('graphSchema')).toEqual(fromJS({}));
    });

    it('updates mapping in new state', () => {
      const action = {
        type: actions.INGESTION_PROFILE_LOAD,
        content: {
          mapping: {
            nodes: [{ name: 'node1' }, { name: 'node2' }],
            links: [{ name: 'link1' }]
          }
        }
      };

      const next = reduceState(initialState, action);

      expect(
        next.get('mapping').equals(
          Map({
            nodes: List([
              OrderedMap({ name: 'node1' }),
              OrderedMap({ name: 'node2' })
            ]),
            links: List([OrderedMap({ name: 'link1' })])
          })
        )
      ).toBeTruthy();
    });

    it('set mapping to an empty map in new state if not provided in action', () => {
      const action = {
        type: actions.INGESTION_PROFILE_LOAD
      };
      const next = reduceState(initialState, action);

      expect(next.get('mapping')).toEqual(fromJS({}));
    });
  });

  describe('when INGESTION_PROFILE_SAVE', () => {
    it('updates status to "CONFIG_STATUS_SAVING" in new state', () => {
      const action = {
        type: actions.INGESTION_PROFILE_SAVE
      };
      const next = reduceState(initialState, action);

      expect(next.get('status')).toEqual('CONFIG_STATUS_SAVING');
    });
  });

  describe('when INGESTION_PROFILE_SAVE_SUCCESS', () => {
    it('updates status to "CONFIG_STATUS_NORMAL" in new state', () => {
      const action = {
        type: actions.INGESTION_PROFILE_SAVE_SUCCESS
      };
      const next = reduceState(initialState, action);

      expect(next.get('status')).toEqual('CONFIG_STATUS_NORMAL');
    });
  });

  describe('when INGESTION_PROFILE_RESET', () => {
    it('resets to initial state', () => {
      const action = { type: actions.INGESTION_PROFILE_RESET };

      const next = reduceState(
        initialState
          .set('name', 'polluted')
          .set('sources', fromJS(['a.csv', 'b.csv']))
          .set('status', CONFIG_STATUS_CHANGED),
        action
      );

      expect(next).toEqual(initialState);
    });
  });

  describe('when INGESTION_PROFILE_ADD_SOURCE', () => {
    let next;
    beforeEach(() => {
      const action = {
        type: actions.INGESTION_PROFILE_ADD_SOURCE,
        source: 'people.csv'
      };
      next = reduceState(initialState, action);
    });
    it('adds source', () => {
      expect(next.get('sources')).toEqual(fromJS(['people.csv']));
    });

    it('sets status to changed', () => {
      expect(next.get('status')).toEqual(CONFIG_STATUS_CHANGED);
    });
  });

  describe('when INGESTION_PROFILE_DELETE_SOURCE', () => {
    let next;
    beforeEach(() => {
      const action = {
        type: actions.INGESTION_PROFILE_DELETE_SOURCE,
        source: 'people.csv'
      };
      next = reduceState(
        initialState.set('sources', fromJS(['people.csv', 'dog.csv'])),
        action
      );
    });

    it('removes source', () => {
      expect(next.get('sources')).toEqual(fromJS(['dog.csv']));
    });

    it('sets status to changed', () => {
      expect(next.get('status')).toEqual(CONFIG_STATUS_CHANGED);
    });
  });

  describe('when GRAPH_SCHEMA_UPDATE_CONTENT', () => {
    it('updates classes in graphSchema', () => {
      const action = {
        type: actions.GRAPH_SCHEMA_UPDATE_CONTENT,
        classes: [
          {
            name: 'class1',
            props: { a: 'a', b: 'b' }
          }
        ],
        classLinks: [{ name: 'name1', source: 'source1', target: 'target1' }]
      };
      const next = reduceState(initialState, action);
      expect(next.getIn(['graphSchema', 'classes'])).toEqual(
        fromJS({
          class1: action.classes[0]
        })
      );
    });

    it('updates classes in graphSchema', () => {
      const action = {
        type: actions.GRAPH_SCHEMA_UPDATE_CONTENT,
        classes: [
          {
            name: 'class1',
            props: { a: 'a', b: 'b' }
          }
        ],
        classLinks: [{ name: 'name1', source: 'source1', target: 'target1' }]
      };
      const next = reduceState(initialState, action);
      expect(
        next
          .getIn(['graphSchema', 'classLinks'])
          .equals(
            Map().set(
              fromJS({ name: 'name1', source: 'source1' }),
              fromJS(action.classLinks[0])
            )
          )
      ).toBeTruthy();
    });

    it('sets classes to empty object if action.classes is null', () => {
      const action = {
        type: actions.GRAPH_SCHEMA_UPDATE_CONTENT,
        classes: null,
        classLinks: [{ name: 'name1', source: 'source1', target: 'target1' }]
      };
      const next = reduceState(initialState, action);
      expect(next.getIn(['graphSchema', 'classes'])).toEqual(Map());
    });

    it('sets classLinks to empty object if action.classes is null', () => {
      const action = {
        type: actions.GRAPH_SCHEMA_UPDATE_CONTENT,
        classes: [
          {
            name: 'class1',
            props: { a: 'a', b: 'b' }
          }
        ],
        classLinks: null
      };
      const next = reduceState(initialState, action);
      expect(next.getIn(['graphSchema', 'classLinks'])).toEqual(Map());
    });
  });

  describe('when GRAPH_SCHEMA_SET_EDITOR_CONTENT', () => {
    it('updates status to "CONFIG_STATUS_CHANGED" in new state', () => {
      const action = {
        type: actions.GRAPH_SCHEMA_SET_EDITOR_CONTENT
      };
      const next = reduceState(initialState, action);

      expect(next.get('status')).toEqual('CONFIG_STATUS_CHANGED');
    });
  });

  describe('when INGESTION_PROFILE_ADD_MAPPING_NODE', () => {
    const mockNode = { name: 'mock node' };
    let next;
    beforeEach(() => {
      const action = {
        type: actions.INGESTION_PROFILE_ADD_MAPPING_NODE,
        node: mockNode
      };
      next = reduceState(initialState, action);
    });
    it('adds node to mapping', () => {
      expect(next.getIn(['mapping', 'nodes'])).toEqual(List([mockNode]));
    });

    it('sets status to changed', () => {
      expect(next.get('status')).toEqual(CONFIG_STATUS_CHANGED);
    });
  });

  describe('when INGESTION_PROFILE_UPDATE_MAPPING_NODE', () => {
    const mockNode = { name: 'new mock node' };
    let next;

    beforeEach(() => {
      const action = {
        type: actions.INGESTION_PROFILE_UPDATE_MAPPING_NODE,
        node: mockNode,
        index: 0
      };
      next = reduceState(
        initialState.setIn(
          ['mapping', 'nodes'],
          List([
            {
              name: 'mock node'
            }
          ])
        ),
        action
      );
    });
    it('updates node in mapping', () => {
      expect(next.getIn(['mapping', 'nodes'])).toEqual(List([mockNode]));
    });

    it('sets status to changed', () => {
      expect(next.get('status')).toEqual(CONFIG_STATUS_CHANGED);
    });
  });

  describe('when INGESTION_PROFILE_DELETE_MAPPING_NODE', () => {
    const mockNode = { name: 'mock node' };
    let next;

    beforeEach(() => {
      const action = {
        type: actions.INGESTION_PROFILE_DELETE_MAPPING_NODE,
        index: 0
      };
      next = reduceState(
        initialState.setIn(['mapping', 'nodes'], List([mockNode])),
        action
      );
    });
    it('deletes node from mapping', () => {
      expect(next.getIn(['mapping', 'nodes'])).toEqual(List());
    });

    it('sets status to changed', () => {
      expect(next.get('status')).toEqual(CONFIG_STATUS_CHANGED);
    });
  });

  describe('when INGESTION_PROFILE_ADD_MAPPING_LINK', () => {
    const mockLink = { name: 'mock link' };
    let next;
    beforeEach(() => {
      const action = {
        type: actions.INGESTION_PROFILE_ADD_MAPPING_LINK,
        link: mockLink
      };
      next = reduceState(initialState, action);
    });
    it('adds link to mapping', () => {
      expect(next.getIn(['mapping', 'links'])).toEqual(List([mockLink]));
    });

    it('sets status to changed', () => {
      expect(next.get('status')).toEqual(CONFIG_STATUS_CHANGED);
    });
  });

  describe('when INGESTION_PROFILE_UPDATE_MAPPING_LINK', () => {
    const mockLink = { name: 'new mock link' };
    let next;

    beforeEach(() => {
      const action = {
        type: actions.INGESTION_PROFILE_UPDATE_MAPPING_LINK,
        link: mockLink,
        index: 0
      };
      next = reduceState(
        initialState.setIn(
          ['mapping', 'links'],
          List([
            {
              name: 'mock link'
            }
          ])
        ),
        action
      );
    });
    it('updates link in mapping', () => {
      expect(next.getIn(['mapping', 'links'])).toEqual(List([mockLink]));
    });

    it('sets status to changed', () => {
      expect(next.get('status')).toEqual(CONFIG_STATUS_CHANGED);
    });
  });

  describe('when INGESTION_PROFILE_DELETE_MAPPING_LINK', () => {
    const mockLink = { name: 'mock link' };
    let next;

    beforeEach(() => {
      const action = {
        type: actions.INGESTION_PROFILE_DELETE_MAPPING_LINK,
        index: 0
      };
      next = reduceState(
        initialState.setIn(['mapping', 'links'], List([mockLink])),
        action
      );
    });
    it('deletes link from mapping', () => {
      expect(next.getIn(['mapping', 'links'])).toEqual(List());
    });

    it('sets status to changed', () => {
      expect(next.get('status')).toEqual(CONFIG_STATUS_CHANGED);
    });
  });

  describe('when other actions are dispatched', () => {
    let next;
    beforeEach(() => {
      const action = {
        type: 'some other action'
      };
      next = reduceState(initialState, action);
    });
    it('state remain unchanged', () => {
      expect(next).toEqual(initialState);
    });
  });

  describe('when no state given', () => {
    it('fallbacks to initial state', () => {
      const action = { type: 'some action' };
      const next = reduceState(undefined, action);
      expect(next).toEqual(initialState);
    });
  });
});
