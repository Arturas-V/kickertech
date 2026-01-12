/**
 * App layer - Redux store, state management, and global config
 */
export { store } from './store';
export type { RootState, AppDispatch } from './store';
export { useAppDispatch, useAppSelector } from './hooks';
export { Providers } from './providers';

// Actions
export { addTournament, addParticipant, addMatch } from './slices/tournamentsSlice';

// Selectors
export {
  selectAllTournaments,
  selectTournamentById,
  selectStandingsByTournamentId,
  selectAvailableOpponents,
  selectParticipantsByTournamentId,
  selectMatchesByTournamentId,
} from './selectors/tournamentsSelectors';
