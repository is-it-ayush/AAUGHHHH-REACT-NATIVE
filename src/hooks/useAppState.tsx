import { type ReactNode, createContext, useContext, useState, Children } from 'react';

type ApplicationState = {
  isAuthenticated: boolean;
};
type PartialApplicationState = Partial<ApplicationState>;
type StateContextValue = [ApplicationState, (newState: PartialApplicationState) => void];

const ApplicationStateContext = createContext<StateContextValue | null>(null);
export const ApplicationStateProvider = ({ children }: { children: ReactNode }) => {
  // state.
  const [applicationState, setApplicationState] = useState<ApplicationState>({
    isAuthenticated: false,
  });

  // handlers.
  function updateApplicationState(state: PartialApplicationState) {
    setApplicationState((prev) => ({
      ...prev,
      state,
    }));
  }

  return (
    <ApplicationStateContext.Provider value={[applicationState, updateApplicationState]}>
      {children}
    </ApplicationStateContext.Provider>
  );
};

export const useAppState = () => {
  const contextValue = useContext(ApplicationStateContext);
  if (!contextValue) {
    throw new Error('useAppState() could only be used within <ApplicationStateProvider />.');
  }
  const [state, setState] = contextValue;
  return {
    state,
    setState
  };
};
