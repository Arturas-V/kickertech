interface WimbledonProps {
  tournamentId: string;
}

/**
 * Wimbledon tournament feature module
 * Lazy-loaded for optimal performance
 */
export default function Wimbledon({ tournamentId }: WimbledonProps) {
  return (
    <div className="tournament-container">
      <h2>Wimbledon</h2>
      <p>Tournament ID: {tournamentId}</p>
      <p>This feature module will contain:</p>
      <ul>
        <li>Add Player Form</li>
        <li>Add Match Form</li>
        <li>Standings Table</li>
        <li>Match History</li>
      </ul>
    </div>
  );
}
