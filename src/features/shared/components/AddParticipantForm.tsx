import { useState, type FormEvent } from 'react';
import { useAppDispatch } from '@/app/hooks';
import { addParticipant } from '@/app/slices/tournamentsSlice';
import './AddParticipantForm.css';

interface AddParticipantFormProps {
  tournamentId: string;
  participantLabel: string; // "Team" or "Player"
  theme?: 'clean' | 'sporty' | 'table';
}

/**
 * Form for adding a new participant (team/player) to a tournament
 */
export function AddParticipantForm({
  tournamentId,
  participantLabel,
  theme = 'clean',
}: AddParticipantFormProps) {
  const dispatch = useAppDispatch();
  const [name, setName] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      dispatch(
        addParticipant({
          tournamentId,
          participant: {
            id: `${tournamentId}-${Date.now()}`,
            name: name.trim(),
          },
        })
      );
      setName('');
    }
  };

  return (
    <form
      className={`add-participant-form add-participant-form--${theme}`}
      onSubmit={handleSubmit}
    >
      <h3>Add {participantLabel}</h3>
      <div className="form-group">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={`${participantLabel} Name`}
          className="form-input"
          required
        />
        <button type="submit" className="form-button">
          Add
        </button>
      </div>
    </form>
  );
}
