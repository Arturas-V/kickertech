import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Tournament, Participant, Match } from '@/domain';
import { createEmptyStats } from '@/domain';

/**
 * Root state shape
 */
export interface TournamentsState {
  tournaments: Record<string, Tournament>;
}

/**
 * Initial state - empty tournaments collection
 */
const initialState: TournamentsState = {
  tournaments: {},
};

/**
 * Payload types for actions
 */
interface AddTournamentPayload {
  id: string;
  name: Tournament['name'];
  type: Tournament['type'];
}

interface AddParticipantPayload {
  tournamentId: string;
  participant: Omit<Participant, 'stats'>;
}

interface AddMatchPayload {
  tournamentId: string;
  match: Match;
}

/**
 * Tournaments slice - manages all tournament state
 */
const tournamentsSlice = createSlice({
  name: 'tournaments',
  initialState,
  reducers: {
    /**
     * Add a new tournament to the state
     */
    addTournament: (state, action: PayloadAction<AddTournamentPayload>) => {
      const { id, name, type } = action.payload;
      state.tournaments[id] = {
        id,
        name,
        type,
        participants: [],
        matches: [],
      };
    },

    /**
     * Add a participant (team/player) to a tournament
     */
    addParticipant: (state, action: PayloadAction<AddParticipantPayload>) => {
      const { tournamentId, participant } = action.payload;
      const tournament = state.tournaments[tournamentId];

      if (tournament) {
        // Add participant with empty stats (will be calculated later)
        tournament.participants.push({
          ...participant,
          stats: createEmptyStats(),
        });
      }
    },

    /**
     * Add a match to a tournament
     * Note: Stats are NOT updated here - they are derived via selectors
     */
    addMatch: (state, action: PayloadAction<AddMatchPayload>) => {
      const { tournamentId, match } = action.payload;
      const tournament = state.tournaments[tournamentId];

      if (tournament) {
        tournament.matches.push(match);
      }
    },
  },
});

/**
 * Exported actions
 */
export const { addTournament, addParticipant, addMatch } = tournamentsSlice.actions;

/**
 * Exported reducer
 */
export default tournamentsSlice.reducer;
