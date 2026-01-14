import type { Stats } from './Stats';

/**
 * Represents a team or player in a tournament.
 */
export interface Participant {
  id: string;
  name: string;
  flag?: string; // Optional emoji flag (e.g., "🇫🇷" for France)
  stats: Stats;
}
