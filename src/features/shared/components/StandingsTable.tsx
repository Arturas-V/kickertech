import { memo } from 'react';
import { useAppSelector } from '@/app/hooks';
import { selectStandingsByTournamentId } from '@/app/selectors/tournamentsSelectors';
import type { Participant } from '@/domain';
import './StandingsTable.scss';

interface StandingsTableProps {
  tournamentId: string;
  theme?: 'clean' | 'sporty' | 'table';
  showIcons?: boolean; // Show checkmarks/X for wins/losses (Wimbledon)
}

interface StandingsRowProps {
  participant: Participant;
  showIcons: boolean;
}

/**
 * Memoized table row component - prevents re-render unless participant data changes
 */
const StandingsRow = memo(({ participant, showIcons }: StandingsRowProps) => {
  return (
    <tr className="standings-table__row">
      <td className="standings-table__cell standings-table__cell--name">
        {participant.name}
      </td>
      <td className="standings-table__cell">{participant.stats.played}</td>
      <td className="standings-table__cell">
          {participant.stats.wins}
        {showIcons && participant.stats.wins > 0 ? (
          <span className="icon-success">✓</span>
        ) : null}
      </td>
      {!showIcons && (
        <td className="standings-table__cell">{participant.stats.draws}</td>
      )}
      <td className="standings-table__cell">
          {participant.stats.losses}
        {showIcons && participant.stats.losses > 0 ? (
          <span className="icon-error">✕</span>
        ) : null}
      </td>
      <td className="standings-table__cell standings-table__cell--points">
        {participant.stats.points}
      </td>
    </tr>
  );
});

StandingsRow.displayName = 'StandingsRow';

/**
 * Displays sorted standings table for a tournament
 * Optimized with React.memo for row-level memoization
 */
export const StandingsTable = memo(function StandingsTable({
  tournamentId,
  theme = 'clean',
  showIcons = false,
}: StandingsTableProps) {
  const standings = useAppSelector((state) =>
    selectStandingsByTournamentId(state, tournamentId)
  );

  if (standings.length === 0) {
    return (
      <div className={`standings-table standings-table--${theme}`}>
        <p className="empty-state">No participants yet. Add some to get started!</p>
      </div>
    );
  }

  return (
    <div className={`standings-table standings-table--${theme}`}>
      <table className="standings-table__table">
        <thead className="standings-table__table-thead">
          <tr className="standings-table__row">
            <th className="standings-table__header">
              {theme === 'table' ? 'Player' : 'Team'}
            </th>
            <th className="standings-table__header">{theme === 'table' ? 'M' : 'P'}</th>
            <th className="standings-table__header">W</th>
            {!showIcons && <th className="standings-table__header">D</th>}
            <th className="standings-table__header">L</th>
            <th className="standings-table__header">Pts</th>
          </tr>
        </thead>
        <tbody className="standings-table__table-tbody">
          {standings.map((participant) => (
            <StandingsRow
              key={participant.id}
              participant={participant}
              showIcons={showIcons}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
});
