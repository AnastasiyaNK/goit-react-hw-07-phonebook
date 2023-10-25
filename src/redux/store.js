import { configureStore } from '@reduxjs/toolkit';
import { phoneBookReducer } from './phoneBookSlice';

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'phoneBook',
  whitelist: ['contacts'],

  storage,
};

const persistedReducer = persistReducer(persistConfig, phoneBookReducer);

export const store = configureStore({
  reducer: {
    phoneBook: persistedReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
