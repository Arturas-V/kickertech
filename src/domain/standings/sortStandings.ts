import type { Participant } from '../models/Participant';

/**
 * Sorts participants by standings according to tournament rules.
 *
 * Sorting priority:
 * 1. Points (descending) - higher points rank higher
 * 2. Wins (descending) - tie-breaker if points are equal
 * 3. Name (ascending) - deterministic fallback for identical records
 *
 * This ensures consistent, reproducible standings display.
 *
 * @param participants - Array of participants to sort
 * @returns New sorted array (does not mutate input)
 */
export function sortStandings(participants: Participant[]): Participant[] {
  return [...participants].sort((a, b) => {
    // Primary: Sort by points (descending)
    if (a.stats.points !== b.stats.points) {
      return b.stats.points - a.stats.points;
    }

    // Secondary: Sort by wins (descending)
    if (a.stats.wins !== b.stats.wins) {
      return b.stats.wins - a.stats.wins;
    }

    // Tertiary: Sort by name (ascending) for determinism
    return a.name.localeCompare(b.name);
  });
}
