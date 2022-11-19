import { ReactNode, createContext, useState } from "react";
import { IUser } from "../utils/interfaces";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export interface IAuthProvider {
  children: ReactNode;
}

interface IAuthContext {
  auth: IUser | null;
  setAuth: React.Dispatch<React.SetStateAction<IUser | null>>;
  getUserData: () => Promise<IUser | null>;
  userRole: string | undefined;
  login: (jwt: any) => void;
  logout: () => void;
}

const AuthContext = createContext({} as IAuthContext);

export const AuthProvider = ({ children }: IAuthProvider) => {
  const [auth, setAuth] = useState<IUser | null>(
    localStorage.getItem("jwt")
      ? jwt_decode(localStorage.getItem("jwt")!)
      : null
  );
  const navigate = useNavigate();

  const getUserData = async () => {
    if (auth) {
      const { data } = await axios.get<IUser>(
        `${process.env.REACT_APP_SERVER_URL}/user/get/${auth?.id}`
      );

      return data as IUser;
    }
    return null;
  };

  const userRole = auth?.role;

  const login = (jwt: any) => {
    localStorage.setItem("jwt", jwt);
    setAuth(jwt_decode(localStorage.getItem("jwt")!));
  };

  const logout = () => {
    localStorage.removeItem("jwt");
    setAuth(null);
    navigate("/");
  };

  return (
    <AuthContext.Provider
      value={{ auth, setAuth, getUserData, userRole, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
