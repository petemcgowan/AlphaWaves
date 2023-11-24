import AsyncStorage from '@react-native-async-storage/async-storage';
import {createStore, applyMiddleware} from 'redux';
// <RootState, string>
// import { configureStore } from "@reduxjs/toolkit";
import {persistStore, persistReducer} from 'redux-persist';
import thunk from 'redux-thunk';

import // todoReducer,
// valuesReducer,
reducers from './reducers/index';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(
  persistConfig,
  // todoReducer,
  reducers,
);

export const store = createStore(persistedReducer, applyMiddleware(thunk));
// export const store = configureStore(persistedReducer);
export const persistor = persistStore(store);
export type ReduxState = ReturnType<typeof store.getState>;
