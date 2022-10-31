import { ReactNode, createContext, useState } from "react";
import { IAuth } from "../utils/interfaces";
import jwt_decode from "jwt-decode";

export interface IAuthProvider {
  children: ReactNode;
}

interface IAuthContext {
  auth: IAuth | null;
  setAuth: React.Dispatch<React.SetStateAction<IAuth | null>>;
  login: (jwt: any) => void;
  logout: () => void;
}

const AuthContext = createContext({} as IAuthContext);

export const AuthProvider = ({ children }: IAuthProvider) => {
  const [auth, setAuth] = useState<IAuth | null>(
    localStorage.getItem("jwt")
      ? jwt_decode(localStorage.getItem("jwt")!)
      : null
  );

  const login = (jwt: any) => {
    localStorage.setItem("jwt", jwt);
    setAuth(jwt_decode(localStorage.getItem("jwt")!));
  };

  const logout = () => {
    console.log("logout clicked");

    localStorage.removeItem("jwt");
    setAuth(null);
  };

  return (
    <AuthContext.Provider value={{ auth, setAuth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
