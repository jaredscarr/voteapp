import * as matchers from 'jasmine-immutable-matchers';
import {List, Map} from 'immutable';
import {setEntries, next, vote} from './core.js';

describe('application logic', () => {
  beforeEach(() => {
    jasmine.addMatchers(matchers);
  });

  describe('setEntries', () => {
    it('adds entries to the state', () => {
      const state = new Map();
      const entries = ['Trainspotting', '28 Days Later'];
      const nextState = setEntries(state, entries);
      expect(nextState).toBeImmutable(new Map({
        entries: List.of('Trainspotting', '28 Days Later')
      }));
    });
// end setEntries block
  });

  describe('next', () => {
    it('takes the next two entries under vote', () => {
      const state = new Map({
        entries: List.of('Trainspotting', '28 Days Later', 'Sunshine')
      });
      const nextState = next(state);
      expect(nextState).toBeImmutable(new Map({
        vote: new Map({
          pair: List.of('Trainspotting', '28 Days Later')
        }),
        entries: List.of('Sunshine')
      }));
    });

    it('puts winner of current vote back to entries', () => {
      const state = new Map({
        vote: new Map({
          pair: List.of('Trainspotting', '28 Days Later'),
          tally: new Map({
            'Trainspotting': 4,
            '28 Days Later': 2
          })
        }),
        entries: List.of('Sunshine', 'Millions', '127 Hours')
      });
      const nextState = next(state);
      expect(nextState).toBeImmutable(new Map({
        vote: new Map({
          pair: List.of('Sunshine', 'Millions')
        }),
        entries: List.of('127 Hours', 'Trainspotting')
      }));
    });

    it('marks winner when just one entry left', () => {
      const state = new Map({
        vote: new Map({
          pair: List.of('Trainspotting', '28 Days Later'),
          tally: new Map({
            'Trainspotting': 4,
            '28 Days': 2
          })
        }),
        entries: new List()
      });
      const nextState = next(state);
      expect(nextState).toBeImmutable(new Map({
        winner: 'Trainspotting'
      }));
    });
// end of next block
  });

  describe('vote', () => {
    it('creates a tally for the voted entry', () => {
      const state = new Map({
        vote: new Map({
          pair: List.of('Trainspotting', '28 Days Later')
        }),
        entries: new List()
      });
      const nextState = vote(state, 'Trainspotting');
      expect(nextState).toBeImmutable(new Map({
        vote: new Map({
          pair: List.of('Trainspotting', '28 Days Later'),
          tally: new Map({
            Trainspotting: 1
          })
        }),
        entries: new List()
      }));
    });

    it('adds to existing tally for the voted entry', () => {
      const state = new Map({
        vote: new Map({
          pair: List.of('Trainspotting', '28 Days Later'),
          tally: new Map({
            'Trainspotting': 3,
            '28 Days Later': 2
          })
        }),
        entries: new List()
      });
      const nextState = vote(state, 'Trainspotting');
      expect(nextState).toBeImmutable(new Map({
        vote: new Map({
          pair: List.of('Trainspotting', '28 Days Later'),
          tally: new Map({
            'Trainspotting': 4,
            '28 Days Later': 2
          })
        }),
        entries: new List()
      }));
    });
// end describe vote
  });
// end describe 'application logic'
});
