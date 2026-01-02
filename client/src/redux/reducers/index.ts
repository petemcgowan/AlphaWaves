import {combineReducers} from 'redux'

import {hasSeenIntro} from './HasSeenIntroReducer'

import cacheReducer from '../slices/cacheSlice'
import uiReducer from '../slices/uiSlice'

const reducers = combineReducers({
  hasSeenIntro,
  cache: cacheReducer,
  ui: uiReducer,
})

export default reducers

export type State = ReturnType<typeof reducers>
