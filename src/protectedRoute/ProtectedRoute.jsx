import { Navigate } from "react-router-dom";
import { userAuthContext } from "../context/userAuthContext";
import { useContext } from "react";
const ProtectedRoute = ({ children }) => {
  const { user } = useContext(userAuthContext);
  // console.log(children)
  console.log("Check user in Private: ", user);
  if (user == null) {
    return <Navigate to="/" />;
  }
  if (user) {
    if (window.location.pathname == "/login") return <Navigate to={"/"} />;
  }
  return children;
};
export default ProtectedRoute;
