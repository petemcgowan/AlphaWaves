import {combineReducers} from 'redux';

import {hasSeenIntro} from './HasSeenIntroReducer';
import {fileCacheReducer} from './FileCacheReducer';

const reducers = combineReducers({
  hasSeenIntro,
  fileCache: fileCacheReducer,
});

export default reducers;

export type State = ReturnType<typeof reducers>;
