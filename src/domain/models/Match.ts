/**
 * Represents a completed match between two participants.
 */
export interface Match {
  id: string;
  homeId: string;
  awayId: string;
  homeScore: number;
  awayScore: number;
  playedAt: number;
}
