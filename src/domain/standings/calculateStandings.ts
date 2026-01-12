import type { Participant } from '../models/Participant';
import type { Match } from '../models/Match';
import { POINTS } from '../rules/scoring';
import { createEmptyStats } from '../rules/stats';

/**
 * Calculates standings by recomputing all participant statistics from matches.
 *
 * This function is:
 * - **Idempotent**: Always produces the same result for the same input
 * - **Pure**: No side effects, returns new objects
 * - **Deterministic**: Guarantees consistent stats calculation
 *
 * Algorithm:
 * 1. Reset all participant stats to zero
 * 2. Iterate through all matches
 * 3. Update both home and away participant stats
 * 4. Apply scoring rules (win: 3pts, draw: 1pt, loss: 0pts)
 *
 * @param participants - Array of participants to calculate standings for
 * @param matches - Array of completed matches
 * @returns New array of participants with recalculated stats
 */
export function calculateStandings(
  participants: Participant[],
  matches: Match[]
): Participant[] {
  // Create a map for O(1) lookups and reset all stats
  const participantMap = new Map<string, Participant>();

  participants.forEach((participant) => {
    participantMap.set(participant.id, {
      ...participant,
      stats: createEmptyStats(),
    });
  });

  // Process each match and update stats
  matches.forEach((match) => {
    const home = participantMap.get(match.homeId);
    const away = participantMap.get(match.awayId);

    // Skip if participants don't exist (defensive)
    if (!home || !away) return;

    // Determine match outcome
    const isHomeWin = match.homeScore > match.awayScore;
    const isAwayWin = match.awayScore > match.homeScore;
    const isDraw = match.homeScore === match.awayScore;

    // Update home participant
    home.stats.played++;
    if (isHomeWin) {
      home.stats.wins++;
      home.stats.points += POINTS.WIN;
    } else if (isDraw) {
      home.stats.draws++;
      home.stats.points += POINTS.DRAW;
    } else {
      home.stats.losses++;
      home.stats.points += POINTS.LOSS;
    }

    // Update away participant
    away.stats.played++;
    if (isAwayWin) {
      away.stats.wins++;
      away.stats.points += POINTS.WIN;
    } else if (isDraw) {
      away.stats.draws++;
      away.stats.points += POINTS.DRAW;
    } else {
      away.stats.losses++;
      away.stats.points += POINTS.LOSS;
    }
  });

  // Convert map back to array
  return Array.from(participantMap.values());
}
