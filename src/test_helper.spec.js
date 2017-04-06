import * as matchers from 'jasmine-immutable-matchers';
import {List} from 'immutable';

describe('My suite', () => {
  beforeEach(() => {
    jasmine.addMatchers(matchers);
  });

  describe('A List', () => {
    function addMovie(currentState, movie) {
      return currentState.push(movie);
    }

    it('is immutable', () => {
      const state = List.of('Trainspotting', '28 Days Later');
      const nextState = addMovie(state, 'Sunshine');

      expect(nextState).toEqual(List.of(
        'Trainspotting',
        '28 Days Later',
        'Sunshine'
      ));
      expect(state).toEqual(List.of(
        'Trainspotting',
        '28 Days Later'
      ));
    });
  });
  // it('passes if the object is immutable', () => {
  //   expect(Immutable.Map()).toBeImmutable();
  // });

  // it('passes if the immutable objects are equal', () => {
  //   expect(Immutable.Map({a: 1})).toEqualImmutable(Immutable.Map({a: 1}));
  // });
});
