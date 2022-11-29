import React, { createContext, useState } from "react";

type UserAuthentication = {
  user?: string;
  password?: string;
  accessToken?: string;
};

type AuthContextType = {
  auth?: UserAuthentication;
  setAuth?: (auth: UserAuthentication) => void;
};

const AuthContext = createContext<AuthContextType>({});

export const AuthProvider = ({ children }: { children: any }) => {
  const [auth, setAuth] = useState<UserAuthentication>({});
  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
