import { configureStore } from '@reduxjs/toolkit';
import tournamentsReducer from './slices/tournamentsSlice';

/**
 * Configure Redux store with all reducers
 */
export const store = configureStore({
  reducer: {
    tournaments: tournamentsReducer,
  },
  // Enable Redux DevTools in development
  devTools: import.meta.env.DEV,
});

/**
 * Infer RootState type from the store
 */
export type RootState = ReturnType<typeof store.getState>;

/**
 * Infer AppDispatch type from the store
 */
export type AppDispatch = typeof store.dispatch;
