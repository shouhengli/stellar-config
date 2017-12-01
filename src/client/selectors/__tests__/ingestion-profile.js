import { fromJS, Set, Seq, List } from 'immutable';
import {
  nameSelector,
  sourcesSelector,
  statusSelector,
  classNamesSelector,
  classLinkKeysSelector,
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
            classes: { a: jest.fn(), b: jest.fn() }
          }
        }
      });
      expect(classNamesSelector(state).toJSON()).toEqual(
        Seq(['a', 'b']).toJSON()
      );
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

  describe('#classLinkKeysSelector', () => {
    it('selects keys of classLinks from ingestionProfile', () => {
      const state = fromJS({
        ingestionProfile: {
          graphSchema: {
            classLinks: { a: jest.fn(), b: jest.fn() }
          }
        }
      });
      expect(classLinkKeysSelector(state).toJSON()).toEqual(
        Seq(['a', 'b']).toJSON()
      );
    });

    it('returns empty sequence if no classes in graphSchema', () => {
      const state = fromJS({
        ingestionProfile: {
          graphSchema: {}
        }
      });
      expect(classLinkKeysSelector(state).toJSON()).toEqual(Seq().toJSON());
    });
  });

  describe('#persistentIngestionProfileSelector', () => {
    it('returns a ingestion profile ready for persistencce', () => {
      const state = fromJS({
        ingestionProfile: {
          sources: ['abc.csv', 'edf.csv'],
          graphSchema: {
            classes: {
              person: { name: 'person' }
            },
            classLinks: {
              isEnemyOf: { src: 'person', dest: 'person', name: 'isEnemyOf' }
            }
          },
          mapping: { a: 'b' }
        },
        ui: {
          graphSchema: {
            editorContent: 'editorContent'
          }
        }
      });
      expect(persistentIngestionProfileSelector(state)).toEqual({
        sources: ['abc.csv', 'edf.csv'],
        graphSchema: {
          classes: [{ name: 'person' }],
          classLinks: [{ src: 'person', dest: 'person', name: 'isEnemyOf' }]
        },
        mapping: { a: 'b' },
        editorContent: 'editorContent'
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
          graphSchema: {
            editorContent: 'editorContent'
          }
        }
      });
      expect(persistentIngestionProfileSelector(state)).toEqual({
        sources: ['abc.csv', 'edf.csv'],
        graphSchema: {
          classes: [],
          classLinks: []
        },
        mapping: { a: 'b' },
        editorContent: 'editorContent'
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
