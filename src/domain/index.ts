/**
 * Domain layer - Pure business logic (framework-agnostic)
 *
 * This layer contains:
 * - Type definitions for core business entities
 * - Business rules and validation logic
 * - Pure functions for data transformation
 *
 * No React, no Redux, no side effects.
 */

// Models
export type {
  Stats,
  Participant,
  Match,
  Tournament,
  TournamentName,
  TournamentType,
} from './models';

// Rules & Utilities
export { createEmptyStats, isDuplicateMatch, isSelfMatch, POINTS } from './rules';

// Standings Engine
export { calculateStandings, sortStandings } from './standings';
