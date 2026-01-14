import { useState } from 'react';
import { AddParticipantForm } from '../shared/components/AddParticipantForm';
import { AddMatchForm } from '../shared/components/AddMatchForm';
import { StandingsTable } from '../shared/components/StandingsTable';
import tennisIcon from '@/assets/tennis.svg';
import './Wimbledon.scss';

interface WimbledonProps {
  tournamentId: string;
}

/**
 * Wimbledon tournament - Table-Centric Design
 * Green theme, 2-column layout, icons for wins/losses
 */
export default function Wimbledon({ tournamentId }: WimbledonProps) {
  const [showAddPlayer, setShowAddPlayer] = useState(false);
  const [showAddScore, setShowAddScore] = useState(false);

  return (
    <div className="wimbledon">
      <div className="wimbledon__header">
        <img src={tennisIcon} alt="Tennis" className="wimbledon__icon" />
        <h2>Wimbledon</h2>
      </div>

      <div className="wimbledon__content">
        <div className="wimbledon__sidebar">
          <div className="wimbledon__buttons">
            <button
              className={`wimbledon__add-btn wimbledon__add-btn--player ${showAddPlayer ? 'wimbledon__add-btn--active' : ''}`}
              onClick={() => setShowAddPlayer(!showAddPlayer)}
            >
              {showAddPlayer ? '− Add Player' : '+ Add Player'}
            </button>
            <button
              className={`wimbledon__add-btn wimbledon__add-btn--score ${showAddScore ? 'wimbledon__add-btn--active' : ''}`}
              onClick={() => setShowAddScore(!showAddScore)}
            >
              {showAddScore ? '− Add Score' : '+ Add Score'}
            </button>
          </div>

          {showAddPlayer && (
            <AddParticipantForm
              tournamentId={tournamentId}
              participantLabel="Player"
              theme="table"
            />
          )}

          {showAddScore && (
            <AddMatchForm
              tournamentId={tournamentId}
              scoreLabel="Add Score"
              theme="table"
            />
          )}
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
