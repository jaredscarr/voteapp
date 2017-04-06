import * as matchers from 'jasmine-immutable-matchers';
import {Map, fromJS} from 'immutable';
import reducer from './reducer.js';

describe('application logic', () => {
  beforeEach(() => {
    jasmine.addMatchers(matchers);
  });

  describe('reducer', () => {
    it('handles SET_ENTRIES', () => {
      const initialState = new Map();
      const action = {type: 'SET_ENTRIES', entries: ['Trainspotting']};
      const nextState = reducer(initialState, action);
      expect(nextState).toBeImmutable(fromJS({
        entries: ['Trainspotting']
      }));
    });

    it('handles NEXT', () => {
      const initialState = fromJS({
        entries: ['Trainspotting', '28 Days Later']
      });
      const action = {type: 'NEXT'};
      const nextState = reducer(initialState, action);
      expect(nextState).toBeImmutable(fromJS({
        vote: {
          pair: ['Trainspotting', '28 Days Later']
        },
        entries: []
      }));
    });

    it('handles NEXT', () => {
      const initialState = fromJS({
        vote: {
          pair: ['Trainspotting', '28 Days Later']
        },
        entries: []
      });
      const action = {type: 'VOTE', entry: 'Trainspotting'};
      const nextState = reducer(initialState, action);
      expect(nextState).toBeImmutable(fromJS({
        vote: {
          pair: ['Trainspotting', '28 Days Later'],
          tally: {Trainspotting: 1}
        },
        entries: []
      }));
    });

    it('has an initial state', () => {
      const action = {type: 'SET_ENTRIES', entries: ['Trainspotting']};
      const nextState = reducer(undefined, action);
      expect(nextState).toBeImmutable(fromJS({
        entries: ['Trainspotting']
      }));
    });

    it('can be used with reduce', () => {
      const actions = [
        {type: 'SET_ENTRIES', entries: ['Trainspotting', '28 Days Later']},
        {type: 'NEXT'},
        {type: 'VOTE', entry: 'Trainspotting'},
        {type: 'VOTE', entry: '28 Days Later'},
        {type: 'VOTE', entry: 'Trainspotting'},
        {type: 'NEXT'}
      ];
      const finalState = actions.reduce(reducer, new Map());
      expect(finalState).toBeImmutable(fromJS({
        winner: 'Trainspotting'
      }));
    });
    // end reducer block
  });
});
