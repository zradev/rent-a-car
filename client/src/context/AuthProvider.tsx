import { ReactNode, createContext, useState } from "react";

export interface IAuthProvider {
  children: ReactNode;
}

const AuthContext = createContext({ auth: {}, setAuth: (auth: any) => {} });

export const AuthProvider = ({ children }: IAuthProvider) => {
  const [auth, setAuth] = useState({});

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
