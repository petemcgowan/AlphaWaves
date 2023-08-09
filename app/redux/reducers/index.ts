import {combineReducers} from 'redux';

import {hasSeenIntro} from './HasSeenIntroReducer';

const reducers = combineReducers({
  hasSeenIntro,
});

export default reducers;

export type State = ReturnType<typeof reducers>;
