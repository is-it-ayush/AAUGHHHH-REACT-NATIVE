import { Slot } from 'expo-router';
import { ApplicationStateProvider } from '~/hooks/useAppState';
import { SessionProvider } from '~/hooks/useSession';

export default function Layout() {
  return (
    <SessionProvider>
      <ApplicationStateProvider>
        <Slot />
      </ApplicationStateProvider>
    </SessionProvider>
  );
}
