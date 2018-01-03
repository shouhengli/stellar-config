import { fromJS, Set, Seq, List } from 'immutable';
import {
  nameSelector,
  sourcesSelector,
  statusSelector,
  classNamesSelector,
  persistentIngestionProfileSelector,
  mappingNodesSelector,
  mappingLinksSelector,
  mappingNodePropOptionsSelector,
  mappingLinkPropOptionsSelector
} from '../ingestion-profile';

describe('ingestion profile selectors', () => {
  describe('#nameSelector', () => {
    it('selects name value from ingestionProfile', () => {
      const state = fromJS({
        ingestionProfile: {
          name: jest.fn()
        }
      });
      expect(nameSelector(state)).toEqual(
        state.getIn(['ingestionProfile', 'name'])
      );
    });
  });

  describe('#sourcesSelector', () => {
    it('selects sources value from ingestionProfile', () => {
      const state = fromJS({
        ingestionProfile: {
          sources: jest.fn()
        }
      });
      expect(sourcesSelector(state)).toEqual(
        state.getIn(['ingestionProfile', 'sources'])
      );
    });
  });

  describe('#statusSelector', () => {
    it('selects status value from ingestionProfile', () => {
      const state = fromJS({
        ingestionProfile: {
          status: jest.fn()
        }
      });
      expect(statusSelector(state)).toEqual(
        state.getIn(['ingestionProfile', 'status'])
      );
    });
  });

  describe('#classNamesSelector', () => {
    it('selects keys of classes from ingestionProfile', () => {
      const state = fromJS({
        ingestionProfile: {
          graphSchema: {
            classes: { 1: { name: 'name1' }, 2: { name: 'name2' } }
          }
        }
      });
      expect(classNamesSelector(state)).toEqual(List(['name1', 'name2']));
    });

    it('returns empty sequence if no classes in graphSchema', () => {
      const state = fromJS({
        ingestionProfile: {
          graphSchema: {}
        }
      });
      expect(classNamesSelector(state).toJSON()).toEqual(Seq().toJSON());
    });
  });

  describe('#persistentIngestionProfileSelector', () => {
    it('returns a ingestion profile ready for persistencce', () => {
      const state = fromJS({
        ingestionProfile: {
          sources: ['abc.csv', 'edf.csv'],
          graphSchema: {
            classes: {
              1: {
                name: 'person',
                globalIndex: '1',
                props: { 10: { name: 'prop' } }
              }
            },
            classLinks: {
              3: {
                name: 'isEnemyOf',
                source: 'person',
                target: 'person',
                globalIndex: '3'
              }
            }
          },
          mapping: { a: 'b' }
        },
        ui: {
          graphSchema: {}
        }
      });
      expect(persistentIngestionProfileSelector(state)).toEqual({
        sources: ['abc.csv', 'edf.csv'],
        graphSchema: {
          classes: [{ name: 'person', props: [{ name: 'prop' }] }],
          classLinks: [
            { source: 'person', target: 'person', name: 'isEnemyOf' }
          ]
        },
        mapping: { a: 'b' }
      });
    });

    it('returns empty list for classes and classLinks when they are not available', () => {
      const state = fromJS({
        ingestionProfile: {
          sources: ['abc.csv', 'edf.csv'],
          graphSchema: {},
          mapping: { a: 'b' }
        },
        ui: {
          graphSchema: {}
        }
      });
      expect(persistentIngestionProfileSelector(state)).toEqual({
        sources: ['abc.csv', 'edf.csv'],
        graphSchema: {
          classes: [],
          classLinks: []
        },
        mapping: { a: 'b' }
      });
    });
  });

  describe('#mappingNodesSelector', () => {
    it('selects nodes from ingestionProfile mapping', () => {
      const state = fromJS({
        ingestionProfile: {
          mapping: { nodes: jest.fn() }
        }
      });
      expect(mappingNodesSelector(state)).toEqual(
        state.getIn(['ingestionProfile', 'mapping', 'nodes'])
      );
    });

    it('returns an empty list if no nodes in mapping', () => {
      const state = fromJS({
        ingestionProfile: {
          mapping: {}
        }
      });
      expect(mappingNodesSelector(state)).toEqual(List());
    });
  });

  describe('#mappingLinksSelector', () => {
    it('selects links from ingestionProfile mapping', () => {
      const state = fromJS({
        ingestionProfile: {
          mapping: { links: jest.fn() }
        }
      });
      expect(mappingLinksSelector(state)).toEqual(
        state.getIn(['ingestionProfile', 'mapping', 'links'])
      );
    });

    it('returns an empty list if no nodes in mapping', () => {
      const state = fromJS({
        ingestionProfile: {
          mapping: {}
        }
      });
      expect(mappingLinksSelector(state)).toEqual(List());
    });
  });

  describe('#mappingNodePropOptionsSelector', () => {
    it("selects a mapping node's  properties from ingestionProfile", () => {
      const state = fromJS({
        ingestionProfile: {
          graphSchema: {
            classes: {
              person: {
                props: { '@id': 'id', name: 'name' }
              },
              '@type': jest.fn(),
              '@id': jest.fn()
            }
          }
        },
        ui: {
          ingestionProfile: {
            mappingNode: {
              '@type': 'person',
              '@id': 'id'
            }
          }
        }
      });
      expect(mappingNodePropOptionsSelector(state)).toEqual(Set(['name']));
    });

    it('returns an empty set if no properties found', () => {
      const state = fromJS({
        ingestionProfile: {
          graphSchema: {
            classes: {
              person: {},
              '@type': jest.fn(),
              '@id': jest.fn()
            }
          }
        },
        ui: {
          ingestionProfile: {
            mappingNode: {
              '@type': 'person',
              '@id': 'id'
            }
          }
        }
      });
      expect(mappingNodePropOptionsSelector(state)).toEqual(Set());
    });
  });

  describe('#mappingLinkPropOptionsSelector', () => {
    it("selects a mapping link's properties from ingestionProfile", () => {
      const state = fromJS({
        ingestionProfile: {
          graphSchema: {
            classLinks: {
              person: {
                props: { '@id': 'id', name: 'name' }
              },
              '@type': jest.fn(),
              '@id': jest.fn()
            }
          }
        },
        ui: {
          ingestionProfile: {
            mappingLink: {
              '@type': 'person',
              '@id': 'id'
            }
          }
        }
      });
      expect(mappingLinkPropOptionsSelector(state)).toEqual(Set(['name']));
    });

    it('returns an empty set if no properties found', () => {
      const state = fromJS({
        ingestionProfile: {
          graphSchema: {
            classLinks: {
              person: {},
              '@type': jest.fn(),
              '@id': jest.fn()
            }
          }
        },
        ui: {
          ingestionProfile: {
            mappingLink: {
              '@type': 'person',
              '@id': 'id'
            }
          }
        }
      });
      expect(mappingLinkPropOptionsSelector(state)).toEqual(Set());
    });
  });
});
