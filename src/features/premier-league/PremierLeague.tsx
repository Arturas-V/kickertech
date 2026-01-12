interface PremierLeagueProps {
  tournamentId: string;
}

/**
 * Premier League tournament feature module
 * Lazy-loaded for optimal performance
 */
export default function PremierLeague({ tournamentId }: PremierLeagueProps) {
  return (
    <div className="tournament-container">
      <h2>Premier League</h2>
      <p>Tournament ID: {tournamentId}</p>
      <p>This feature module will contain:</p>
      <ul>
        <li>Add Team Form</li>
        <li>Add Match Form</li>
        <li>Standings Table</li>
        <li>Match History</li>
      </ul>
    </div>
  );
}
