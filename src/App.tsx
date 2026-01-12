import { useState, useEffect, Suspense, lazy, useMemo, useCallback } from 'react';
import { useAppSelector } from './app/hooks';
import { selectAllTournaments } from './app/selectors/tournamentsSelectors';
import { Header, Footer, TournamentSwitcher } from './shared/components';
import { useInitializeTournaments } from './hooks/useInitializeTournaments';
import './App.scss';

// Lazy-load tournament feature modules for code splitting
const PremierLeague = lazy(() => import('./features/premier-league/PremierLeague'));
const Eurobasket = lazy(() => import('./features/eurobasket/Eurobasket'));
const Wimbledon = lazy(() => import('./features/wimbledon/Wimbledon'));

/**
 * Main App component with shell layout
 * Only renders the active tournament for optimal performance
 * Optimized with useMemo and useCallback to prevent unnecessary re-renders
 */
function App() {
  // Initialize tournaments on first load
  useInitializeTournaments();

  // Get all tournaments from Redux
  const tournaments = useAppSelector(selectAllTournaments);

  // Memoize tournament list to avoid recreation on every render
  const tournamentList = useMemo(() => Object.values(tournaments), [tournaments]);

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

  // Memoize active tournament lookup
  const activeTournament = useMemo(
    () => (activeTournamentId ? tournaments[activeTournamentId] : null),
    [tournaments, activeTournamentId]
  );

  // Memoize tournament list for TournamentSwitcher
  const tournamentSwitcherData = useMemo(
    () => tournamentList.map((t) => ({ id: t.id, name: t.name })),
    [tournamentList]
  );

  // Memoize tournament component selection
  const getTournamentComponent = useCallback(() => {
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
  }, [activeTournament]);

  return (
    <div className="app-container">
      <Header />

      <TournamentSwitcher
        tournaments={tournamentSwitcherData}
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
