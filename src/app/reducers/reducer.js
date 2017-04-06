import {setEntries, next, vote, INITIAL_STATE} from '../actions/core.js';

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'SET_ENTRIES':
      return setEntries(state, action.entries);
    case 'NEXT':
      return next(state);
    case 'VOTE':
      return vote(state, action.entry);
    // no default
  }
  return state;
}
