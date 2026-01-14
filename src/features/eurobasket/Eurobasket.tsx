import { useState, useMemo } from 'react';
import { useAppSelector } from '@/app/hooks';
import { selectParticipantsByTournamentId } from '@/app/selectors/tournamentsSelectors';
import { AddParticipantForm } from '../shared/components/AddParticipantForm';
import { AddMatchForm } from '../shared/components/AddMatchForm';
import { StandingsTable } from '../shared/components/StandingsTable';
import { MatchList } from '../shared/components/MatchList';
import { EUROPEAN_COUNTRIES } from '@/domain/data/countries';
import basketballIcon from '@/assets/basketball.svg';
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

  // Get current participants to filter out already added countries
  const participants = useAppSelector((state) =>
    selectParticipantsByTournamentId(state, tournamentId)
  );

  // Filter out countries that have already been added
  const availableCountries = useMemo(() => {
    const addedCountryNames = new Set(participants.map((p) => p.name));
    return EUROPEAN_COUNTRIES.filter((country) => !addedCountryNames.has(country.name));
  }, [participants]);

  return (
    <div className="eurobasket">
      <div className="eurobasket__header">
        <img src={basketballIcon} alt="Basketball" className="eurobasket__icon" />
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
              countriesList={availableCountries}
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
