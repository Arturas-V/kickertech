/**
 * Storage adapter interface for persisting application state.
 * This abstraction allows for easy swapping of storage implementations
 * (localStorage, sessionStorage, IndexedDB, backend API, etc.)
 */
export interface StorageAdapter {
  /**
   * Load the persisted state from storage
   * @returns The persisted state, or null if no state exists
   */
  load(): unknown | null;

  /**
   * Save the current state to storage
   * @param state - The state to persist
   */
  save(state: unknown): void;

  /**
   * Clear all persisted state from storage
   */
  clear(): void;
}
