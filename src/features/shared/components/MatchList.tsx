import { memo, useMemo, useCallback } from 'react';
import { useAppSelector } from '@/app/hooks';
import {
  selectMatchesByTournamentId,
  selectTournamentById,
} from '@/app/selectors/tournamentsSelectors';
import type { Match } from '@/domain';
import './MatchList.scss';

interface MatchListProps {
  tournamentId: string;
  theme?: 'clean' | 'sporty' | 'table';
  limit?: number; // Max matches to show
}

interface MatchItemProps {
  match: Match;
  homeName: string;
  awayName: string;
}

/**
 * Memoized match item - prevents re-render unless match data changes
 */
const MatchItem = memo(({ match, homeName, awayName }: MatchItemProps) => {
  return (
    <div className="match-item">
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
});

MatchItem.displayName = 'MatchItem';

/**
 * Displays list of recent matches
 * Optimized with React.memo and useMemo for expensive operations
 */
export const MatchList = memo(function MatchList({
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

  // Memoize participant name lookup function
  const getParticipantName = useCallback(
    (id: string) => {
      return tournament?.participants.find((p) => p.id === id)?.name || 'Unknown';
    },
    [tournament]
  );

  // Memoize expensive sorting and slicing operation
  const recentMatches = useMemo(() => {
    if (!matches.length) return [];
    return [...matches]
      .sort((a, b) => b.playedAt - a.playedAt)
      .slice(0, limit);
  }, [matches, limit]);

  if (!tournament || matches.length === 0) {
    return (
      <div className={`match-list match-list--${theme}`}>
        <p className="empty-state">No matches yet</p>
      </div>
    );
  }

  return (
    <div className={`match-list match-list--${theme}`}>
      {recentMatches.map((match) => (
        <MatchItem
          key={match.id}
          match={match}
          homeName={getParticipantName(match.homeId)}
          awayName={getParticipantName(match.awayId)}
        />
      ))}
    </div>
  );
});
