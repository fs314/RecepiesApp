import React, { createContext, useContext, useState } from "react";

type AuthCredentials = {
  user?: string;
  accessToken?: string;
};

type IAuthState = {
  auth: AuthCredentials;
  setAuth: (auth: AuthCredentials) => void;
};

const authContext = createContext<IAuthState>({
  auth: {},
  setAuth: () => {},
});

const useAuth = () => useContext(authContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [auth, setAuth] = useState<AuthCredentials>({});

  return (
    <authContext.Provider value={{ auth, setAuth }}>
      {children}
    </authContext.Provider>
  );
};

export default useAuth;
