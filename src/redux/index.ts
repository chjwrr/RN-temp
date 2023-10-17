import { configureStore } from '@reduxjs/toolkit'
import settingReducer from './setting'
import userInfoReducer from './userInfo'

import { combineReducers } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useSelector, useDispatch } from 'react-redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';

import AsyncStorage from '@react-native-async-storage/async-storage'

const persistConfig = {
  key: 'root',
  storage:AsyncStorage,
  blacklist: []
};

const reducer = combineReducers({
  setting:settingReducer,
  userInfo:userInfoReducer
});

const persistedReducer = persistReducer(persistConfig, reducer);
export const reduxStore = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

export const persistor = persistStore(reduxStore);

export type RootState = ReturnType<typeof reduxStore.getState>;
export type RootDispatch = typeof reduxStore.dispatch;

export const useRootDispatch = () => useDispatch<any>();
export const useRootSelector: TypedUseSelectorHook<RootState> = useSelector;
