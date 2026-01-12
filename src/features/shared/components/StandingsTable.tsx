import { useAppSelector } from '@/app/hooks';
import { selectStandingsByTournamentId } from '@/app/selectors/tournamentsSelectors';
import './StandingsTable.scss';

interface StandingsTableProps {
  tournamentId: string;
  theme?: 'clean' | 'sporty' | 'table';
  showIcons?: boolean; // Show checkmarks/X for wins/losses (Wimbledon)
}

/**
 * Displays sorted standings table for a tournament
 */
export function StandingsTable({
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
        <thead>
          <tr>
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
        <tbody>
          {standings.map((participant) => (
            <tr key={participant.id} className="standings-table__row">
              <td className="standings-table__cell standings-table__cell--name">
                {participant.name}
              </td>
              <td className="standings-table__cell">{participant.stats.played}</td>
              <td className="standings-table__cell">
                {showIcons && participant.stats.wins > 0 ? (
                  <span className="icon-success">✓</span>
                ) : null}
                {participant.stats.wins}
              </td>
              {!showIcons && (
                <td className="standings-table__cell">{participant.stats.draws}</td>
              )}
              <td className="standings-table__cell">
                {showIcons && participant.stats.losses > 0 ? (
                  <span className="icon-error">✕</span>
                ) : null}
                {participant.stats.losses}
              </td>
              <td className="standings-table__cell standings-table__cell--points">
                {participant.stats.points}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
