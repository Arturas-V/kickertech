import type { Stats } from './Stats';

/**
 * Represents a team or player in a tournament.
 */
export interface Participant {
  id: string;
  name: string;
  stats: Stats;
}
