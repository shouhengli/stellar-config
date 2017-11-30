import { fromJS, List } from 'immutable';

import {
  newNameSelector,
  newVisibleSelector,
  deleteVisibleSelector,
  deleteNameSelector,
  activeTabSelector,
  newSourceVisibleSelector,
  newSourceSelector,
  deleteSourceVisibleSelector,
  selectedSourceSelector,
  samplesSelector,
  sampleOfSelectedSourceSelector,
  newNodeVisibleSelector,
  mappingNodeSelector,
  mappingNodeActivePropSelector,
  mappingNodeColumnOptionsSelector,
  mappingNodeSaveEnabledSelector,
  editingNodeIndexSelector,
  newLinkVisibleSelector,
  mappingLinkSelector,
  mappingLinkActivePropSelector,
  mappingLinkColumnOptionsSelector,
  mappingLinkSaveEnabledSelector,
  editingLinkIndexSelector
} from '../ingestion-profile';

describe('ingstion profile selectors', () => {
  describe('#newNameSelector', () => {
    it('select the newName value from ui ingestion profile', () => {
      const state = fromJS({
        ui: {
          ingestionProfile: {
            newName: jest.fn()
          }
        }
      });
      expect(newNameSelector(state)).toEqual(
        state.getIn(['ui', 'ingestionProfile', 'newName'])
      );
    });
  });

  describe('#newVisibleSelector', () => {
    it('select the newVisible value from ui ingestion profile', () => {
      const state = fromJS({
        ui: {
          ingestionProfile: {
            newVisible: jest.fn()
          }
        }
      });
      expect(newVisibleSelector(state)).toEqual(
        state.getIn(['ui', 'ingestionProfile', 'newVisible'])
      );
    });
  });

  describe('#deleteVisibleSelector', () => {
    it('select the deleteVisible value from ui ingestion profile', () => {
      const state = fromJS({
        ui: {
          ingestionProfile: {
            deleteVisible: jest.fn()
          }
        }
      });
      expect(deleteVisibleSelector(state)).toEqual(
        state.getIn(['ui', 'ingestionProfile', 'deleteVisible'])
      );
    });
  });

  describe('#deleteNameSelector', () => {
    it('select the deleteName value from ui ingestion profile', () => {
      const state = fromJS({
        ui: {
          ingestionProfile: {
            deleteName: jest.fn()
          }
        }
      });
      expect(deleteNameSelector(state)).toEqual(
        state.getIn(['ui', 'ingestionProfile', 'deleteName'])
      );
    });
  });

  describe('#activeTabSelector', () => {
    it('select the activeTab value from ui ingestion profile', () => {
      const state = fromJS({
        ui: {
          ingestionProfile: {
            activeTab: jest.fn()
          }
        }
      });
      expect(activeTabSelector(state)).toEqual(
        state.getIn(['ui', 'ingestionProfile', 'activeTab'])
      );
    });
  });

  describe('#newSourceVisibleSelector', () => {
    it('select the newSourceVisible value from ui ingestion profile', () => {
      const state = fromJS({
        ui: {
          ingestionProfile: {
            newSourceVisible: jest.fn()
          }
        }
      });
      expect(newSourceVisibleSelector(state)).toEqual(
        state.getIn(['ui', 'ingestionProfile', 'newSourceVisible'])
      );
    });
  });

  describe('#newSourceSelector', () => {
    it('select the newSource value from ui ingestion profile', () => {
      const state = fromJS({
        ui: {
          ingestionProfile: {
            newSource: jest.fn()
          }
        }
      });
      expect(newSourceSelector(state)).toEqual(
        state.getIn(['ui', 'ingestionProfile', 'newSource'])
      );
    });
  });

  describe('#deleteSourceVisibleSelector', () => {
    it('select the deleteSourceVisible value from ui ingestion profile', () => {
      const state = fromJS({
        ui: {
          ingestionProfile: {
            deleteSourceVisible: jest.fn()
          }
        }
      });
      expect(deleteSourceVisibleSelector(state)).toEqual(
        state.getIn(['ui', 'ingestionProfile', 'deleteSourceVisible'])
      );
    });
  });

  describe('#selectedSourceSelector', () => {
    it('select the selectedSource value from ui ingestion profile', () => {
      const state = fromJS({
        ui: {
          ingestionProfile: {
            selectedSource: jest.fn()
          }
        }
      });
      expect(selectedSourceSelector(state)).toEqual(
        state.getIn(['ui', 'ingestionProfile', 'selectedSource'])
      );
    });
  });

  describe('#samplesSelector', () => {
    it('select the samples value from ui ingestion profile', () => {
      const state = fromJS({
        ui: {
          ingestionProfile: {
            samples: jest.fn()
          }
        }
      });
      expect(samplesSelector(state)).toEqual(
        state.getIn(['ui', 'ingestionProfile', 'samples'])
      );
    });
  });

  describe('#sampleOfSelectedSourceSelector', () => {
    it('select the sample of selected source from ui ingestion profile', () => {
      const state = fromJS({
        ui: {
          ingestionProfile: {
            samples: { 'abc.csv': jest.fn(), 'bcd.csv': 'wrong file' },
            selectedSource: 'abc.csv'
          }
        }
      });
      expect(sampleOfSelectedSourceSelector(state)).toEqual(
        state.getIn(['ui', 'ingestionProfile', 'samples', 'abc.csv'])
      );
    });
  });

  describe('#newNodeVisibleSelector', () => {
    it('select the newNodeVisible value from ui ingestion profile', () => {
      const state = fromJS({
        ui: {
          ingestionProfile: {
            newNodeVisible: jest.fn()
          }
        }
      });
      expect(newNodeVisibleSelector(state)).toEqual(
        state.getIn(['ui', 'ingestionProfile', 'newNodeVisible'])
      );
    });
  });

  describe('#newLinkVisibleSelector', () => {
    it('select the newLinkVisible value from ui ingestion profile', () => {
      const state = fromJS({
        ui: {
          ingestionProfile: {
            newLinkVisible: jest.fn()
          }
        }
      });
      expect(newLinkVisibleSelector(state)).toEqual(
        state.getIn(['ui', 'ingestionProfile', 'newLinkVisible'])
      );
    });
  });

  describe('#mappingNodeSelector', () => {
    it('select the mappingNode value from ui ingestion profile', () => {
      const state = fromJS({
        ui: {
          ingestionProfile: {
            mappingNode: jest.fn()
          }
        }
      });
      expect(mappingNodeSelector(state)).toEqual(
        state.getIn(['ui', 'ingestionProfile', 'mappingNode'])
      );
    });
  });

  describe('#mappingNodeActivePropSelector', () => {
    it('select the mappingNodeActiveProp value from ui ingestion profile', () => {
      const state = fromJS({
        ui: {
          ingestionProfile: {
            mappingNodeActiveProp: jest.fn()
          }
        }
      });
      expect(mappingNodeActivePropSelector(state)).toEqual(
        state.getIn(['ui', 'ingestionProfile', 'mappingNodeActiveProp'])
      );
    });
  });

  describe('#mappingNodeColumnOptionsSelector', () => {
    it('select the column names of the selected CSV', () => {
      const state = fromJS({
        ui: {
          ingestionProfile: {
            newName: jest.fn(),
            samples: {
              'abc.csv': { headers: ['a', 'b', 'c'] }
            },
            mappingNodeActiveProp: { key: 'id' },
            mappingNode: { id: { source: 'abc.csv' } }
          }
        }
      });
      expect(mappingNodeColumnOptionsSelector(state)).toEqual(
        state.getIn(['ui', 'ingestionProfile', 'samples', 'abc.csv', 'headers'])
      );
    });

    it('returns empty list if the selected source cannot be found', () => {
      const state = fromJS({
        ui: {
          ingestionProfile: {
            newName: jest.fn(),
            samples: {
              'abc.csv': { headers: ['a', 'b', 'c'] }
            },
            mappingNodeActiveProp: { key: 'id' },
            mappingNode: { id: { source: 'def.csv' } }
          }
        }
      });
      expect(mappingNodeColumnOptionsSelector(state)).toEqual(List());
    });

    it('returns empty list if the selected csv has no headers', () => {
      const state = fromJS({
        ui: {
          ingestionProfile: {
            newName: jest.fn(),
            samples: {
              'abc.csv': {}
            },
            mappingNodeActiveProp: { key: 'id' },
            mappingNode: { id: { source: 'abc.csv' } }
          }
        }
      });
      expect(mappingNodeColumnOptionsSelector(state)).toEqual(List());
    });
  });

  describe('#mappingNodeSaveEnabledSelector', () => {
    it('returns false when @id has not been mapped', () => {
      const state = fromJS({
        ui: {
          ingestionProfile: {
            mappingNode: { '@type': jest.fn() }
          }
        }
      });
      expect(mappingNodeSaveEnabledSelector(state)).toBe(false);
    });

    it('returns false when @type has not been mapped', () => {
      const state = fromJS({
        ui: {
          ingestionProfile: {
            mappingNode: { '@id': jest.fn() }
          }
        }
      });
      expect(mappingNodeSaveEnabledSelector(state)).toBe(false);
    });

    it('returns false when mappingNode has new attributetype that are not yet mapped', () => {
      const state = fromJS({
        ui: {
          ingestionProfile: {
            mappingNode: {
              '@id': jest.fn(),
              '@type': jest.fn(),
              '': jest.fn()
            }
          }
        }
      });
      expect(mappingNodeSaveEnabledSelector(state)).toBe(false);
    });

    it('returns false when mappingNode has nil values', () => {
      const state = fromJS({
        ui: {
          ingestionProfile: {
            mappingNode: {
              '@id': {
                source: 'abc.csv',
                column: 'id'
              },
              '@type': {
                source: 'abc.csv',
                column: 'type'
              },
              abc: null
            }
          }
        }
      });
      expect(mappingNodeSaveEnabledSelector(state)).toBe(false);
    });

    it('returns false when mappingNode has empty values', () => {
      const state = fromJS({
        ui: {
          ingestionProfile: {
            mappingNode: {
              '@id': {
                source: 'abc.csv',
                column: 'id'
              },
              '@type': {
                source: 'abc.csv',
                column: 'type'
              },
              abc: ''
            }
          }
        }
      });
      expect(mappingNodeSaveEnabledSelector(state)).toBe(false);
    });

    it('returns false when a mappingNode has empty source', () => {
      const state = fromJS({
        ui: {
          ingestionProfile: {
            mappingNode: {
              '@id': {
                source: '',
                column: 'id'
              },
              '@type': {
                source: 'abc.csv',
                column: 'type'
              }
            }
          }
        }
      });
      expect(mappingNodeSaveEnabledSelector(state)).toBe(false);
    });

    it('returns false when a mappingNode has empty column', () => {
      const state = fromJS({
        ui: {
          ingestionProfile: {
            mappingNode: {
              '@id': {
                source: 'abc.csv',
                column: ''
              },
              '@type': {
                source: 'abc.csv',
                column: 'type'
              }
            }
          }
        }
      });
      expect(mappingNodeSaveEnabledSelector(state)).toBe(false);
    });

    it('returns true when mappingNode has source and column', () => {
      const state = fromJS({
        ui: {
          ingestionProfile: {
            mappingNode: {
              '@id': {
                source: 'abc.csv',
                column: 'id'
              },
              '@type': {
                source: 'abc.csv',
                column: 'type'
              }
            }
          }
        }
      });
      expect(mappingNodeSaveEnabledSelector(state)).toBe(true);
    });
  });

  describe('#editingNodeIndexSelector', () => {
    it('select the editingNodeIndex value from ui ingestion profile', () => {
      const state = fromJS({
        ui: {
          ingestionProfile: {
            editingNodeIndex: jest.fn()
          }
        }
      });
      expect(editingNodeIndexSelector(state)).toEqual(
        state.getIn(['ui', 'ingestionProfile', 'editingNodeIndex'])
      );
    });
  });

  describe('#mappingLinkSelector', () => {
    it('select the mappingLink value from ui ingestion profile', () => {
      const state = fromJS({
        ui: {
          ingestionProfile: {
            mappingLink: jest.fn()
          }
        }
      });
      expect(mappingLinkSelector(state)).toEqual(
        state.getIn(['ui', 'ingestionProfile', 'mappingLink'])
      );
    });
  });

  describe('#mappingLinkActivePropSelector', () => {
    it('select the mappingLinkActiveProp value from ui ingestion profile', () => {
      const state = fromJS({
        ui: {
          ingestionProfile: {
            mappingLinkActiveProp: jest.fn()
          }
        }
      });
      expect(mappingLinkActivePropSelector(state)).toEqual(
        state.getIn(['ui', 'ingestionProfile', 'mappingLinkActiveProp'])
      );
    });
  });

  describe('#mappingLinkColumnOptionsSelector', () => {
    it('select the column names of the selected CSV', () => {
      const state = fromJS({
        ui: {
          ingestionProfile: {
            newName: jest.fn(),
            samples: {
              'abc.csv': { headers: ['a', 'b', 'c'] }
            },
            mappingLinkActiveProp: { key: 'id' },
            mappingLink: { id: { source: 'abc.csv' } }
          }
        }
      });
      expect(mappingLinkColumnOptionsSelector(state)).toEqual(
        state.getIn(['ui', 'ingestionProfile', 'samples', 'abc.csv', 'headers'])
      );
    });

    it('returns empty list if the selected source cannot be found', () => {
      const state = fromJS({
        ui: {
          ingestionProfile: {
            newName: jest.fn(),
            samples: {
              'abc.csv': { headers: ['a', 'b', 'c'] }
            },
            mappingLinkActiveProp: { key: 'id' },
            mappingLink: { id: { source: 'def.csv' } }
          }
        }
      });
      expect(mappingLinkColumnOptionsSelector(state)).toEqual(List());
    });

    it('returns empty list if the selected csv has no headers', () => {
      const state = fromJS({
        ui: {
          ingestionProfile: {
            newName: jest.fn(),
            samples: {
              'abc.csv': {}
            },
            mappingLinkActiveProp: { key: 'id' },
            mappingLink: { id: { source: 'abc.csv' } }
          }
        }
      });
      expect(mappingLinkColumnOptionsSelector(state)).toEqual(List());
    });
  });

  describe('#mappingLinkSaveEnabledSelector', () => {
    it('returns false when @src has not been mapped', () => {
      const state = fromJS({
        ui: {
          ingestionProfile: {
            mappingLink: { '@type': jest.fn(), '@dest': jest.fn() }
          }
        }
      });
      expect(mappingLinkSaveEnabledSelector(state)).toBe(false);
    });

    it('returns false when @dest has not been mapped', () => {
      const state = fromJS({
        ui: {
          ingestionProfile: {
            mappingLink: { '@src': jest.fn(), '@type': jest.fn() }
          }
        }
      });
      expect(mappingLinkSaveEnabledSelector(state)).toBe(false);
    });

    it('returns false when @type has not been mapped', () => {
      const state = fromJS({
        ui: {
          ingestionProfile: {
            mappingLink: { '@src': jest.fn(), '@dest': jest.fn() }
          }
        }
      });
      expect(mappingLinkSaveEnabledSelector(state)).toBe(false);
    });

    it('returns false when mappingLink has new attributetype that are not yet mapped', () => {
      const state = fromJS({
        ui: {
          ingestionProfile: {
            mappingLink: {
              '@src': jest.fn(),
              '@dest': jest.fn(),
              '@type': jest.fn(),
              '': jest.fn()
            }
          }
        }
      });
      expect(mappingLinkSaveEnabledSelector(state)).toBe(false);
    });

    it('returns false when mappingLink has nil values', () => {
      const state = fromJS({
        ui: {
          ingestionProfile: {
            mappingLink: {
              '@dest': {
                source: 'abc.csv',
                column: 'dest'
              },
              '@src': {
                source: 'abc.csv',
                column: 'src'
              },
              '@type': jest.fn(),
              abc: null
            }
          }
        }
      });
      expect(mappingLinkSaveEnabledSelector(state)).toBe(false);
    });

    it('returns false when mappingLink has empty values', () => {
      const state = fromJS({
        ui: {
          ingestionProfile: {
            mappingLink: {
              '@src': {
                source: 'abc.csv',
                column: 'src'
              },
              '@dest': {
                source: 'abc.csv',
                column: 'dest'
              },
              '@type': jest.fn(),
              abc: ''
            }
          }
        }
      });
      expect(mappingLinkSaveEnabledSelector(state)).toBe(false);
    });

    it('returns false when a mappingLink has empty source', () => {
      const state = fromJS({
        ui: {
          ingestionProfile: {
            mappingLink: {
              '@src': {
                source: '',
                column: 'src'
              },
              '@dest': {
                source: 'abc.csv',
                column: 'dest'
              },
              '@type': jest.fn(),
              abc: {}
            }
          }
        }
      });
      expect(mappingLinkSaveEnabledSelector(state)).toBe(false);
    });

    it('returns false when a mappingLink has empty column', () => {
      const state = fromJS({
        ui: {
          ingestionProfile: {
            mappingLink: {
              '@src': {
                source: 'abc.csv',
                column: ''
              },
              '@dest': {
                source: 'abc.csv',
                column: 'dest'
              },
              '@type': jest.fn(),
              abc: {}
            }
          }
        }
      });
      expect(mappingLinkSaveEnabledSelector(state)).toBe(false);
    });

    it('returns true when mappingLink has source and column', () => {
      const state = fromJS({
        ui: {
          ingestionProfile: {
            mappingLink: {
              '@src': {
                source: 'abc.csv',
                column: 'src'
              },
              '@dest': {
                source: 'abc.csv',
                column: 'dest'
              },
              '@type': jest.fn()
            }
          }
        }
      });
      expect(mappingLinkSaveEnabledSelector(state)).toBe(true);
    });
  });

  describe('#editingLinkIndexSelector', () => {
    it('select the editingLinkIndex value from ui ingestion profile', () => {
      const state = fromJS({
        ui: {
          ingestionProfile: {
            editingLinkIndex: jest.fn()
          }
        }
      });
      expect(editingLinkIndexSelector(state)).toEqual(
        state.getIn(['ui', 'ingestionProfile', 'editingLinkIndex'])
      );
    });
  });
});
