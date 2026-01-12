import type { StorageAdapter } from './StorageAdapter';

const STORAGE_KEY = 'sports-standings-app-state';

/**
 * LocalStorage implementation of StorageAdapter.
 * Provides persistent storage across browser sessions.
 */
export class LocalStorageAdapter implements StorageAdapter {
  /**
   * Load persisted state from localStorage
   */
  load(): unknown | null {
    try {
      const serialized = localStorage.getItem(STORAGE_KEY);
      if (serialized === null) {
        return null;
      }
      return JSON.parse(serialized) as unknown;
    } catch (error) {
      console.error('Failed to load state from localStorage:', error);
      return null;
    }
  }

  /**
   * Save state to localStorage
   */
  save(state: unknown): void {
    try {
      const serialized = JSON.stringify(state);
      localStorage.setItem(STORAGE_KEY, serialized);
    } catch (error) {
      console.error('Failed to save state to localStorage:', error);
    }
  }

  /**
   * Clear persisted state from localStorage
   */
  clear(): void {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error('Failed to clear state from localStorage:', error);
    }
  }
}
