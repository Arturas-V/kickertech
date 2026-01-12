import { useAppSelector } from '@/app/hooks';
import { selectMatchesByTournamentId, selectTournamentById } from '@/app/selectors/tournamentsSelectors';
import './MatchList.css';

interface MatchListProps {
  tournamentId: string;
  theme?: 'clean' | 'sporty' | 'table';
  limit?: number; // Max matches to show
}

/**
 * Displays list of recent matches
 */
export function MatchList({
  tournamentId,
  theme = 'clean',
  limit = 5,
}: MatchListProps) {
  const matches = useAppSelector((state) =>
    selectMatchesByTournamentId(state, tournamentId)
  );
  const tournament = useAppSelector((state) =>
    selectTournamentById(state, tournamentId)
  );

  if (!tournament || matches.length === 0) {
    return (
      <div className={`match-list match-list--${theme}`}>
        <p className="empty-state">No matches yet</p>
      </div>
    );
  }

  // Get participant name by ID
  const getParticipantName = (id: string) => {
    return tournament.participants.find((p) => p.id === id)?.name || 'Unknown';
  };

  // Show most recent matches first
  const recentMatches = [...matches]
    .sort((a, b) => b.playedAt - a.playedAt)
    .slice(0, limit);

  return (
    <div className={`match-list match-list--${theme}`}>
      {recentMatches.map((match) => {
        const homeName = getParticipantName(match.homeId);
        const awayName = getParticipantName(match.awayId);

        return (
          <div key={match.id} className="match-item">
            <div className="match-participants">
              <span className="match-team">{homeName}</span>
              <span className="match-vs">vs</span>
              <span className="match-team">{awayName}</span>
            </div>
            <div className="match-score">
              {match.homeScore}-{match.awayScore}
            </div>
          </div>
        );
      })}
    </div>
  );
}
