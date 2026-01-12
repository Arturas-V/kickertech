import { configureStore } from '@reduxjs/toolkit';
import tournamentsReducer, { type TournamentsState } from './slices/tournamentsSlice';
import {
  LocalStorageAdapter,
  createPersistenceMiddleware,
} from '@/infrastructure';

// Initialize storage adapter
const storage = new LocalStorageAdapter();

/**
 * Configure Redux store with all reducers, persistence, and hydration
 */
export const store = configureStore({
  reducer: {
    tournaments: tournamentsReducer,
  },
  // Hydrate store with persisted state from localStorage
  preloadedState: (() => {
    try {
      const persistedState = storage.load();
      if (persistedState) {
        console.log('Hydrating state from storage');
        return persistedState as { tournaments: TournamentsState };
      }
    } catch (error) {
      console.error('Failed to load persisted state:', error);
    }
    return undefined;
  })(),
  // Add persistence middleware (debounced auto-save)
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(createPersistenceMiddleware(storage, 1000)),
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
