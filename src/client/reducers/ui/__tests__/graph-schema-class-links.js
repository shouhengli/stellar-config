import { Map, fromJS } from 'immutable';
import reduceState from '../graph-schema-class-links';
import actions from '../../../actions';

describe('reducer class-links', () => {
  let initialState;

  beforeEach(() => {
    initialState = Map();
  });

  describe('when GRAPH_SCHEMA_UPDATE_CONTENT', () => {
    let state;

    beforeEach(() => {
      state = initialState.set(
        fromJS({ name: 'lives-at', source: 'Person' }),
        fromJS({ name: 'lives-at', source: 'Person', target: 'Street' })
      );
    });

    it('updates class links with data provided in action', () => {
      const action = {
        type: actions.GRAPH_SCHEMA_UPDATE_CONTENT,
        classLinks: [
          { name: 'lives-at', source: 'Person', target: 'Place' },
          { name: 'receives', source: 'Person', target: 'Package' }
        ]
      };
      const next = reduceState(state, action);
      const expected = Map()
        .set(
          fromJS({ name: 'lives-at', source: 'Person' }),
          fromJS({ name: 'lives-at', source: 'Person', target: 'Place' })
        )
        .set(
          fromJS({ name: 'receives', source: 'Person' }),
          fromJS({ name: 'receives', source: 'Person', target: 'Package' })
        );

      expect(next.equals(expected)).toBeTruthy();
    });

    it('sets classLinks to emtpy map if no class links provided in action', () => {
      const action = {
        type: actions.GRAPH_SCHEMA_UPDATE_CONTENT,
        classLinks: []
      };
      const next = reduceState(state, action);
      const expected = Map();

      expect(next.equals(expected)).toBeTruthy();
    });
  });

  describe('when GRAPH_SCHEMA_UPDATE_ELEMENT_POSITIONS', () => {
    let state;
    beforeEach(() => {
      state = initialState.set(
        fromJS({ name: 'lives-at', source: 'Person' }),
        fromJS({
          name: 'lives-at',
          source: 'Person',
          target: 'Street',
          x: 0,
          y: 0
        })
      );
    });

    it('updates only position of class links', () => {
      const action = {
        type: actions.GRAPH_SCHEMA_UPDATE_ELEMENT_POSITIONS,
        classLinks: [
          { name: 'lives-at', source: 'Person', target: 'Place', x: 1, y: 1 }
        ]
      };
      const next = reduceState(state, action);
      const expected = Map().set(
        fromJS({ name: 'lives-at', source: 'Person' }),
        fromJS({
          name: 'lives-at',
          source: 'Person',
          target: 'Street',
          x: 1,
          y: 1
        })
      );

      expect(next.equals(expected)).toBe(true);
    });

    it('will not update any class link if any matched key is found', () => {
      const action = {
        type: actions.GRAPH_SCHEMA_UPDATE_ELEMENT_POSITIONS,
        classLinks: [
          { name: 'sleeps on', source: 'Person', target: 'Bed', x: 1, y: 1 }
        ]
      };

      const next = reduceState(state, action);
      const expected = Map().set(
        fromJS({ name: 'lives-at', source: 'Person' }),
        fromJS({
          name: 'lives-at',
          source: 'Person',
          target: 'Street',
          x: 0,
          y: 0
        })
      );
      expect(next.equals(expected)).toBe(true);
    });
  });

  describe('when GRAPH_SCHEMA_UPDATE_CLASS_LINK_POSITION', () => {
    let state;
    beforeEach(() => {
      state = initialState.set(
        fromJS({ name: 'lives-at', source: 'Person' }),
        fromJS({
          name: 'lives-at',
          source: 'Person',
          target: 'Street',
          x: 0,
          y: 0
        })
      );
    });

    it('increments position of matched class links', () => {
      const action = {
        type: actions.GRAPH_SCHEMA_UPDATE_CLASS_LINK_POSITION,
        name: 'lives-at',
        source: 'Person',
        target: 'Place',
        dx: 1,
        dy: -1
      };
      const next = reduceState(state, action);

      const expected = Map().set(
        fromJS({ name: 'lives-at', source: 'Person' }),
        fromJS({
          name: 'lives-at',
          source: 'Person',
          target: 'Street',
          x: 1,
          y: -1
        })
      );

      expect(next.equals(expected)).toBe(true);
    });

    it('leave unmatching class links untouched', () => {
      const action = {
        type: actions.GRAPH_SCHEMA_UPDATE_CLASS_LINK_POSITION,
        name: 'sleeps on',
        source: 'Person',
        target: 'Street',
        dx: 1,
        dy: -1
      };
      const next = reduceState(state, action);

      const expected = Map().set(
        fromJS({ name: 'lives-at', source: 'Person' }),
        fromJS({
          name: 'lives-at',
          source: 'Person',
          target: 'Street',
          x: 0,
          y: 0
        })
      );

      expect(next).toEqual(expected);
      expect(next.equals(expected)).toBe(true);
    });
  });

  describe('when GRAPH_SCHEMA_UPDATE_CLASS_LINK_LENGTHS', () => {
    let state;
    beforeEach(() => {
      state = initialState
        .set(
          fromJS({ name: 'lives-at', source: 'Person' }),
          fromJS({
            name: 'lives-at',
            source: 'Person',
            target: 'Street',
            length: 1,
            x: 0,
            y: 0
          })
        )
        .set(
          fromJS({ name: 'has', source: 'Person' }),
          fromJS({
            name: 'has',
            source: 'Person',
            target: 'Dog',
            x: 100,
            y: 100
          })
        );
    });

    it('updates length of class links', () => {
      const action = {
        type: actions.GRAPH_SCHEMA_UPDATE_CLASS_LINK_LENGTHS,
        classLinks: [
          { name: 'lives-at', source: 'Person', length: 11 },
          { name: 'has', source: 'Person', length: 22 }
        ]
      };
      const next = reduceState(state, action);

      const expected = state
        .set(
          fromJS({ name: 'lives-at', source: 'Person' }),
          fromJS({
            name: 'lives-at',
            source: 'Person',
            target: 'Street',
            x: 0,
            y: 0,
            length: 11
          })
        )
        .set(
          fromJS({ name: 'has', source: 'Person' }),
          fromJS({
            name: 'has',
            source: 'Person',
            target: 'Dog',
            x: 100,
            y: 100,
            length: 22
          })
        );

      expect(next.equals(expected)).toBe(true);
    });

    it('leaves unmatching links untouched', () => {
      const action = {
        type: actions.GRAPH_SCHEMA_UPDATE_CLASS_LINK_LENGTHS,
        classLinks: [{ name: 'sleeps on', source: 'Person', length: 11 }]
      };
      const next = reduceState(state, action);

      const expected = state
        .set(
          fromJS({ name: 'lives-at', source: 'Person' }),
          fromJS({
            name: 'lives-at',
            source: 'Person',
            target: 'Street',
            length: 1,
            x: 0,
            y: 0
          })
        )
        .set(
          fromJS({ name: 'has', source: 'Person' }),
          fromJS({
            name: 'has',
            source: 'Person',
            target: 'Dog',
            x: 100,
            y: 100
          })
        );

      expect(next.equals(expected)).toBe(true);
    });
  });

  describe('when other actions', () => {
    it('leaves state untouched', () => {
      const action = { type: 'some action' };
      const next = reduceState(initialState, action);
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
