import type { Stats } from '../models/Stats';

/**
 * Creates an empty stats object with all values initialized to zero.
 * Used when creating new participants.
 */
export function createEmptyStats(): Stats {
  return {
    played: 0,
    wins: 0,
    draws: 0,
    losses: 0,
    points: 0,
  };
}
