import { useState, useCallback, memo, type FormEvent, type ChangeEvent } from 'react';
import { useAppDispatch } from '@/app/hooks';
import { addParticipant } from '@/app/slices/tournamentsSlice';
import type { Country } from '@/domain/data/countries';
import './AddParticipantForm.scss';

interface AddParticipantFormProps {
  tournamentId: string;
  participantLabel: string; // "Team" or "Player"
  theme?: 'clean' | 'sporty' | 'table';
  showFlagInput?: boolean; // Show flag emoji input (for Eurobasket)
  countriesList?: Country[]; // Optional list of countries for select dropdown
}

/**
 * Form for adding a new participant (team/player) to a tournament
 * Optimized with React.memo and useCallback
 */
export const AddParticipantForm = memo(function AddParticipantForm({
  tournamentId,
  participantLabel,
  theme = 'clean',
  showFlagInput = false,
  countriesList,
}: AddParticipantFormProps) {
  const dispatch = useAppDispatch();
  const [name, setName] = useState('');
  const [flag, setFlag] = useState('');

  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      if (name.trim()) {
        dispatch(
          addParticipant({
            tournamentId,
            participant: {
              id: `${tournamentId}-${Date.now()}`,
              name: name.trim(),
              ...(flag.trim() && { flag: flag.trim() }),
            },
          })
        );
        setName('');
        setFlag('');
      }
    },
    [dispatch, tournamentId, name, flag]
  );

  const handleNameChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  }, []);

  const handleCountrySelect = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    const selectedCountry = countriesList?.find(c => c.name === e.target.value);
    if (selectedCountry) {
      setName(selectedCountry.name);
      setFlag(selectedCountry.flag);
    }
  }, [countriesList]);

  const handleFlagChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setFlag(e.target.value);
  }, []);

  return (
    <form
      className={`add-participant-form add-participant-form--${theme}`}
      onSubmit={handleSubmit}
    >
      <h3>Add {participantLabel}</h3>
      <div className="form-group">
        {countriesList ? (
          <select
            value={name}
            onChange={handleCountrySelect}
            className="form-select"
            required
          >
            <option value="">Select {participantLabel}</option>
            {countriesList.map((country) => (
              <option key={country.name} value={country.name}>
                {country.flag} {country.name}
              </option>
            ))}
          </select>
        ) : (
          <>
            {showFlagInput && (
              <input
                type="text"
                value={flag}
                onChange={handleFlagChange}
                placeholder="🇫🇷"
                className="form-input form-input--flag"
                maxLength={4}
              />
            )}
            <input
              type="text"
              value={name}
              onChange={handleNameChange}
              placeholder={`${participantLabel} Name`}
              className="form-input"
              required
            />
          </>
        )}
        <button type="submit" className="form-button">
          Add
        </button>
      </div>
    </form>
  );
});
