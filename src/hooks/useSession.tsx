import { ReactNode, createContext, useContext, useState } from "react";
import { useStorageState } from "./useStorageState";

export type UserSession = {
  token: string,
  username: string,
  email: string,
  id: string,
};

type Session = {
  signIn: () => void,
  signOut: () => void,
  session: UserSession | null,
  isAuthenticated: boolean,
  isLoading: boolean,
}
const SessionContext = createContext<Session | null>(null);
export const SessionProvider = ({ children }: { children: ReactNode }) => {
  // state.
  const [userSession, setUserSession] = useStorageState<UserSession>('session', null);

  // handlers.
  function signIn() {
  }
  function signOut() {
  }

  return (
    <SessionContext.Provider value={{
      signIn: signIn,
      signOut: signOut,
      session: userSession,
      isAuthenticated: userSession !== null,
      isLoading: false,
    }}>
      {children}
    </SessionContext.Provider>
  );
}

export const useSession = () => {
  const session = useContext(SessionContext);
  if (!session) {
    throw new Error("useSession can only be used within <SessionProvider />")
  }
  return session;
}
