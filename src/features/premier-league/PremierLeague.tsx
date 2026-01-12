import { AddParticipantForm } from '../shared/components/AddParticipantForm';
import { AddMatchForm } from '../shared/components/AddMatchForm';
import { StandingsTable } from '../shared/components/StandingsTable';
import './PremierLeague.css';

interface PremierLeagueProps {
  tournamentId: string;
}

/**
 * Premier League tournament - Clean & Minimal Design
 * White background, blue accents, 3-column layout
 */
export default function PremierLeague({ tournamentId }: PremierLeagueProps) {
  return (
    <div className="premier-league">
      <div className="premier-league__header">
        <h2>Premier League</h2>
      </div>

      <div className="premier-league__content">
        <div className="premier-league__column">
          <AddParticipantForm
            tournamentId={tournamentId}
            participantLabel="Team"
            theme="clean"
          />
        </div>

        <div className="premier-league__column">
          <AddMatchForm
            tournamentId={tournamentId}
            scoreLabel="Add Score"
            theme="clean"
          />
        </div>

        <div className="premier-league__column">
          <StandingsTable tournamentId={tournamentId} theme="clean" />
        </div>
      </div>
    </div>
  );
}
