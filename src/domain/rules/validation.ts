import type { Match } from '../models/Match';

/**
 * Checks if a match between two participants already exists in the tournament.
 * A match is considered duplicate if the same two participants have played
 * before, regardless of home/away order.
 *
 * @param matches - Array of existing matches in the tournament
 * @param homeId - ID of the home participant
 * @param awayId - ID of the away participant
 * @returns true if a match between these participants already exists
 */
export function isDuplicateMatch(
  matches: Match[],
  homeId: string,
  awayId: string
): boolean {
  return matches.some(
    (match) =>
      (match.homeId === homeId && match.awayId === awayId) ||
      (match.homeId === awayId && match.awayId === homeId)
  );
}

/**
 * Validates that a participant is not playing against itself.
 *
 * @param homeId - ID of the home participant
 * @param awayId - ID of the away participant
 * @returns true if the participant is trying to play against itself
 */
export function isSelfMatch(homeId: string, awayId: string): boolean {
  return homeId === awayId;
}
