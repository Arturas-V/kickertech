import type { Participant } from './Participant';
import type { Match } from './Match';

/**
 * Tournament name literals.
 */
export type TournamentName = 'Premier League' | 'Eurobasket' | 'Wimbledon';

/**
 * Tournament type: team-based or player-based.
 */
export type TournamentType = 'team' | 'player';

/**
 * Represents a complete tournament with participants and match history.
 */
export interface Tournament {
  id: string;
  name: TournamentName;
  type: TournamentType;
  participants: Participant[];
  matches: Match[];
}
