/**
 * Infrastructure layer - Side effects & IO
 */
export type { StorageAdapter } from './storage';
export { LocalStorageAdapter } from './storage';
export { createPersistenceMiddleware } from './persistence';
