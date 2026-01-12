interface EurobasketProps {
  tournamentId: string;
}

/**
 * Eurobasket tournament feature module
 * Lazy-loaded for optimal performance
 */
export default function Eurobasket({ tournamentId }: EurobasketProps) {
  return (
    <div className="tournament-container">
      <h2>Eurobasket</h2>
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
