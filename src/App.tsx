import { useState, useEffect, Suspense, lazy } from 'react';
import { useAppSelector } from './app/hooks';
import { selectAllTournaments } from './app/selectors/tournamentsSelectors';
import { Header, Footer, TournamentSwitcher } from './shared/components';
import { useInitializeTournaments } from './hooks/useInitializeTournaments';
import './App.css';

// Lazy-load tournament feature modules (will be created later)
const PremierLeague = lazy(() => import('./features/premier-league/PremierLeague'));
const Eurobasket = lazy(() => import('./features/eurobasket/Eurobasket'));
const Wimbledon = lazy(() => import('./features/wimbledon/Wimbledon'));

/**
 * Main App component with shell layout
 * Only renders the active tournament for optimal performance
 */
function App() {
  // Initialize tournaments on first load
  useInitializeTournaments();

  // Get all tournaments from Redux
  const tournaments = useAppSelector(selectAllTournaments);
  const tournamentList = Object.values(tournaments);

  // Track active tournament
  const [activeTournamentId, setActiveTournamentId] = useState<string | null>(
    tournamentList[0]?.id || null
  );

  // Update active tournament when tournaments load
  useEffect(() => {
    if (!activeTournamentId && tournamentList.length > 0) {
      setActiveTournamentId(tournamentList[0].id);
    }
  }, [tournamentList, activeTournamentId]);

  // Get active tournament
  const activeTournament = activeTournamentId
    ? tournaments[activeTournamentId]
    : null;

  // Map tournament names to components
  const getTournamentComponent = () => {
    if (!activeTournament) return null;

    switch (activeTournament.name) {
      case 'Premier League':
        return <PremierLeague tournamentId={activeTournament.id} />;
      case 'Eurobasket':
        return <Eurobasket tournamentId={activeTournament.id} />;
      case 'Wimbledon':
        return <Wimbledon tournamentId={activeTournament.id} />;
      default:
        return null;
    }
  };

  return (
    <div className="app-container">
      <Header />

      <TournamentSwitcher
        tournaments={tournamentList.map((t) => ({ id: t.id, name: t.name }))}
        activeTournamentId={activeTournamentId}
        onSelect={setActiveTournamentId}
      />

      <main className="app-main">
        <Suspense fallback={<div className="loading">Loading tournament...</div>}>
          {getTournamentComponent()}
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}

export default App;
