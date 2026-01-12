import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { selectAllTournaments } from '@/app/selectors/tournamentsSelectors';
import { addTournament } from '@/app/slices/tournamentsSlice';

/**
 * Hook to initialize the three tournaments on first load
 * Only adds tournaments if they don't already exist (idempotent)
 */
export function useInitializeTournaments() {
  const dispatch = useAppDispatch();
  const tournaments = useAppSelector(selectAllTournaments);

  useEffect(() => {
    const tournamentList = Object.values(tournaments);

    // Only initialize if no tournaments exist
    if (tournamentList.length === 0) {
      // Add Premier League
      dispatch(
        addTournament({
          id: 'premier-league',
          name: 'Premier League',
          type: 'team',
        })
      );

      // Add Eurobasket
      dispatch(
        addTournament({
          id: 'eurobasket',
          name: 'Eurobasket',
          type: 'team',
        })
      );

      // Add Wimbledon
      dispatch(
        addTournament({
          id: 'wimbledon',
          name: 'Wimbledon',
          type: 'player',
        })
      );
    }
  }, [dispatch, tournaments]);
}
