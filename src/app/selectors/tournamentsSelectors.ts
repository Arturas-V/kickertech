import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { calculateStandings, sortStandings } from '@/domain';

/**
 * Base selector - get all tournaments
 */
export const selectAllTournaments = (state: RootState) => state.tournaments.tournaments;

/**
 * Select a specific tournament by ID
 */
export const selectTournamentById = createSelector(
  [selectAllTournaments, (_state: RootState, tournamentId: string) => tournamentId],
  (tournaments, tournamentId) => tournaments[tournamentId] || null
);

/**
 * Select calculated and sorted standings for a tournament
 * This is where the magic happens - stats are derived, not stored
 */
export const selectStandingsByTournamentId = createSelector(
  [selectTournamentById],
  (tournament) => {
    if (!tournament) return [];

    // Calculate stats from matches
    const participantsWithStats = calculateStandings(
      tournament.participants,
      tournament.matches
    );

    // Sort by points, wins, then name
    return sortStandings(participantsWithStats);
  }
);

/**
 * Select available opponents for a participant
 * Returns participants that haven't played against the given participant yet
 */
export const selectAvailableOpponents = createSelector(
  [
    selectTournamentById,
    (_state: RootState, _tournamentId: string, participantId: string) => participantId,
  ],
  (tournament, participantId) => {
    if (!tournament) return [];

    // Get all participant IDs that have already played against this participant
    const playedAgainst = new Set<string>();

    tournament.matches.forEach((match) => {
      if (match.homeId === participantId) {
        playedAgainst.add(match.awayId);
      } else if (match.awayId === participantId) {
        playedAgainst.add(match.homeId);
      }
    });

    // Return participants that haven't played yet (excluding self)
    return tournament.participants.filter(
      (p) => p.id !== participantId && !playedAgainst.has(p.id)
    );
  }
);

/**
 * Select all participants for a tournament
 */
export const selectParticipantsByTournamentId = createSelector(
  [selectTournamentById],
  (tournament) => tournament?.participants || []
);

/**
 * Select all matches for a tournament
 */
export const selectMatchesByTournamentId = createSelector(
  [selectTournamentById],
  (tournament) => tournament?.matches || []
);
