import { ReactNode, createContext, useState } from "react";
import { IAuth } from "../utils/interfaces";
import jwt_decode from "jwt-decode";
import axios from "axios";

export interface IAuthProvider {
  children: ReactNode;
}

interface IAuthContext {
  auth: IAuth | null;
  setAuth: React.Dispatch<React.SetStateAction<IAuth | null>>;
  getUserData: () => Promise<IAuth>;
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

  const getUserData = async () => {
    const { data } = await axios.get<IAuth>(
      `http://localhost:8080/user/get/${auth?.id}`
    );
    return data;
  };

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
    <AuthContext.Provider value={{ auth, setAuth, getUserData, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
