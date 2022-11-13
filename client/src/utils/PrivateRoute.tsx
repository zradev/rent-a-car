import { FC, useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../context/AuthProvider";

interface PropType {
  component: React.FC;
}

const PrivateRoute: FC<PropType> = ({ component: Component }) => {
  const { userRole } = useContext(AuthContext);

  if (userRole === "admin") return <Component />;
  return <Navigate to="/login" />;
};

export default PrivateRoute;
