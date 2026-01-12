import { type TournamentName } from '@/domain';
import './TournamentSwitcher.css';

interface TournamentSwitcherProps {
  tournaments: Array<{ id: string; name: TournamentName }>;
  activeTournamentId: string | null;
  onSelect: (tournamentId: string) => void;
}

/**
 * Tournament switcher component
 * Allows users to select which tournament to view
 */
export function TournamentSwitcher({
  tournaments,
  activeTournamentId,
  onSelect,
}: TournamentSwitcherProps) {
  if (tournaments.length === 0) {
    return (
      <div className="tournament-switcher">
        <p className="no-tournaments">No tournaments available</p>
      </div>
    );
  }

  return (
    <div className="tournament-switcher">
      <div className="tournament-tabs">
        {tournaments.map((tournament) => (
          <button
            key={tournament.id}
            className={`tournament-tab ${
              activeTournamentId === tournament.id ? 'active' : ''
            }`}
            onClick={() => onSelect(tournament.id)}
          >
            {tournament.name}
          </button>
        ))}
      </div>
    </div>
  );
}
