import { useState } from 'react';
import { type TournamentName } from '@/domain';
import './TournamentSwitcher.scss';

interface TournamentSwitcherProps {
  tournaments: Array<{ id: string; name: TournamentName }>;
  activeTournamentId: string | null;
  onSelect: (tournamentId: string) => void;
}

/**
 * Tournament switcher component
 * Allows users to select which tournament to view
 * Includes burger menu for mobile devices
 */
export function TournamentSwitcher({
  tournaments,
  activeTournamentId,
  onSelect,
}: TournamentSwitcherProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  if (tournaments.length === 0) {
    return (
      <div className="tournament-switcher">
        <p className="no-tournaments">No tournaments available</p>
      </div>
    );
  }

  const activeTournament = tournaments.find((t) => t.id === activeTournamentId);

  const handleSelect = (tournamentId: string) => {
    onSelect(tournamentId);
    setIsMenuOpen(false); // Close menu after selection on mobile
  };

  return (
    <div className="tournament-switcher">
      {/* Mobile burger menu button */}
      <button
        className="tournament-switcher__burger"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Toggle tournament menu"
      >
        <span className={`burger-icon ${isMenuOpen ? 'open' : ''}`}>
          <span></span>
          <span></span>
          <span></span>
        </span>
        <span className="burger-text">
          {activeTournament?.name || 'Select Tournament'}
        </span>
      </button>

      {/* Tournament tabs */}
      <div className={`tournament-tabs ${isMenuOpen ? 'open' : ''}`}>
        {tournaments.map((tournament) => (
          <button
            key={tournament.id}
            className={`tournament-tab ${
              activeTournamentId === tournament.id ? 'active' : ''
            }`}
            onClick={() => handleSelect(tournament.id)}
          >
            {tournament.name}
          </button>
        ))}
      </div>
    </div>
  );
}
