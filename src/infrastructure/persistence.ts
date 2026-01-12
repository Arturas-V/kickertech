import type { Middleware } from '@reduxjs/toolkit';
import type { StorageAdapter } from './storage/StorageAdapter';
import { debounce } from '@/shared/utils/debounce';

/**
 * Creates a Redux middleware that auto-saves state changes to storage.
 * Uses debouncing to prevent excessive writes.
 *
 * @param storage - The storage adapter to use for persistence
 * @param debounceMs - Milliseconds to wait before saving (default: 1000ms)
 * @returns Redux middleware
 */
export function createPersistenceMiddleware(
  storage: StorageAdapter,
  debounceMs = 1000
): Middleware {
  // Create debounced save function
  const debouncedSave = debounce((state: unknown) => {
    storage.save(state as never);
  }, debounceMs);

  return (store) => (next) => (action) => {
    // Pass action to next middleware
    const result = next(action);

    // After state updates, save it (debounced)
    debouncedSave(store.getState());

    return result;
  };
}
