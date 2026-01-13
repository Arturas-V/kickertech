import { useState } from 'react';
import { AddParticipantForm } from '../shared/components/AddParticipantForm';
import { AddMatchForm } from '../shared/components/AddMatchForm';
import { StandingsTable } from '../shared/components/StandingsTable';
import { MatchList } from '../shared/components/MatchList';
import './Eurobasket.scss';

interface EurobasketProps {
  tournamentId: string;
}

/**
 * Eurobasket tournament - Sporty & Energetic Design
 * Dark green background, orange buttons, flag icons, match results
 */
export default function Eurobasket({ tournamentId }: EurobasketProps) {
  const [showAddTeam, setShowAddTeam] = useState(false);
  const [showAddScore, setShowAddScore] = useState(false);

  return (
    <div className="eurobasket">
      <div className="eurobasket__header">
        <div className="eurobasket__icon">🏀</div>
        <h2>EUROBASKET</h2>
      </div>

      <div className="eurobasket__content">
        <div className="eurobasket__section">
          <div className="eurobasket__buttons">
            <button
              className="eurobasket__add-btn"
              onClick={() => setShowAddTeam(!showAddTeam)}
            >
              {showAddTeam ? '− Hide Team Form' : '+ Add Team'}
            </button>
            <button
              className="eurobasket__add-btn"
              onClick={() => setShowAddScore(!showAddScore)}
            >
              {showAddScore ? '− Hide Score Form' : '+ Add Score'}
            </button>
          </div>

          {showAddTeam && (
            <AddParticipantForm
              tournamentId={tournamentId}
              participantLabel="Team"
              theme="sporty"
            />
          )}

          {showAddScore && (
            <AddMatchForm
              tournamentId={tournamentId}
              scoreLabel="Add Score"
              theme="sporty"
            />
          )}

          <MatchList tournamentId={tournamentId} theme="sporty" limit={3} />
        </div>

        <div className="eurobasket__section">
          <h3 className="eurobasket__subtitle">Score Table:</h3>
          <StandingsTable tournamentId={tournamentId} theme="sporty" />
        </div>
      </div>
    </div>
  );
}
