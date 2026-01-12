import { useState, type FormEvent } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { addMatch } from '@/app/slices/tournamentsSlice';
import { selectParticipantsByTournamentId } from '@/app/selectors/tournamentsSelectors';
import { isDuplicateMatch, isSelfMatch } from '@/domain';
import './AddMatchForm.scss';

interface AddMatchFormProps {
  tournamentId: string;
  scoreLabel: string; // "Score" or "Add Score"
  theme?: 'clean' | 'sporty' | 'table';
}

/**
 * Form for adding match results between two participants
 */
export function AddMatchForm({
  tournamentId,
  scoreLabel,
  theme = 'clean',
}: AddMatchFormProps) {
  const dispatch = useAppDispatch();
  const participants = useAppSelector((state) =>
    selectParticipantsByTournamentId(state, tournamentId)
  );
  const matches = useAppSelector((state) => state.tournaments.tournaments[tournamentId]?.matches || []);

  const [homeId, setHomeId] = useState('');
  const [awayId, setAwayId] = useState('');
  const [homeScore, setHomeScore] = useState('');
  const [awayScore, setAwayScore] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError('');

    if (!homeId || !awayId) {
      setError('Please select both participants');
      return;
    }

    if (isSelfMatch(homeId, awayId)) {
      setError('A participant cannot play against itself');
      return;
    }

    if (isDuplicateMatch(matches, homeId, awayId)) {
      setError('These participants have already played');
      return;
    }

    const home = parseInt(homeScore);
    const away = parseInt(awayScore);

    if (isNaN(home) || isNaN(away) || home < 0 || away < 0) {
      setError('Please enter valid scores');
      return;
    }

    dispatch(
      addMatch({
        tournamentId,
        match: {
          id: `${tournamentId}-match-${Date.now()}`,
          homeId,
          awayId,
          homeScore: home,
          awayScore: away,
          playedAt: Date.now(),
        },
      })
    );

    // Reset form
    setHomeId('');
    setAwayId('');
    setHomeScore('');
    setAwayScore('');
  };

  const isDisabled = participants.length < 2;

  return (
    <form
      className={`add-match-form add-match-form--${theme}`}
      onSubmit={handleSubmit}
    >
      <h3>{scoreLabel}</h3>

      {isDisabled && (
        <p className="form-warning">Add at least 2 participants to record matches</p>
      )}

      <div className="form-row">
        <select
          value={homeId}
          onChange={(e) => setHomeId(e.target.value)}
          className="form-select"
          disabled={isDisabled}
          required
        >
          <option value="">Home Team</option>
          {participants.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>

        <select
          value={awayId}
          onChange={(e) => setAwayId(e.target.value)}
          className="form-select"
          disabled={isDisabled}
          required
        >
          <option value="">Away Team</option>
          {participants.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>
      </div>

      <div className="form-row">
        <input
          type="number"
          value={homeScore}
          onChange={(e) => setHomeScore(e.target.value)}
          placeholder="Home Score"
          className="form-input"
          min="0"
          disabled={isDisabled}
          required
        />

        <input
          type="number"
          value={awayScore}
          onChange={(e) => setAwayScore(e.target.value)}
          placeholder="Away Score"
          className="form-input"
          min="0"
          disabled={isDisabled}
          required
        />
      </div>

      {error && <p className="form-error">{error}</p>}

      <button type="submit" className="form-submit" disabled={isDisabled}>
        {scoreLabel}
      </button>
    </form>
  );
}
