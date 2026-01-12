import { AddParticipantForm } from '../shared/components/AddParticipantForm';
import { AddMatchForm } from '../shared/components/AddMatchForm';
import { StandingsTable } from '../shared/components/StandingsTable';
import './Wimbledon.css';

interface WimbledonProps {
  tournamentId: string;
}

/**
 * Wimbledon tournament - Table-Centric Design
 * Green theme, 2-column layout, icons for wins/losses
 */
export default function Wimbledon({ tournamentId }: WimbledonProps) {
  return (
    <div className="wimbledon">
      <div className="wimbledon__header">
        <div className="wimbledon__icon">🎾</div>
        <h2>Wimbledon</h2>
      </div>

      <div className="wimbledon__content">
        <div className="wimbledon__sidebar">
          <div className="wimbledon__buttons">
            <button className="wimbledon__add-btn wimbledon__add-btn--player">
              + Add Player
            </button>
            <button className="wimbledon__add-btn wimbledon__add-btn--score">
              + Add Score
            </button>
          </div>

          <AddParticipantForm
            tournamentId={tournamentId}
            participantLabel="Player"
            theme="table"
          />

          <AddMatchForm
            tournamentId={tournamentId}
            scoreLabel="Add Score"
            theme="table"
          />
        </div>

        <div className="wimbledon__main">
          <StandingsTable
            tournamentId={tournamentId}
            theme="table"
            showIcons={true}
          />
        </div>
      </div>
    </div>
  );
}
