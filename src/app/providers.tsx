import { Provider } from 'react-redux';
import { store } from './store';

interface ProvidersProps {
  children: React.ReactNode;
}

/**
 * App providers wrapper
 * Combines all context providers (Redux, Theme, etc.)
 */
export function Providers({ children }: ProvidersProps) {
  return <Provider store={store}>{children}</Provider>;
}
