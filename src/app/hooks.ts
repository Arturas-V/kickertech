import { useDispatch, useSelector, type TypedUseSelectorHook } from 'react-redux';
import type { RootState, AppDispatch } from './store';

/**
 * Typed useDispatch hook
 * Use this instead of plain `useDispatch` for automatic type inference
 */
export const useAppDispatch = () => useDispatch<AppDispatch>();

/**
 * Typed useSelector hook
 * Use this instead of plain `useSelector` for automatic type inference
 */
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
