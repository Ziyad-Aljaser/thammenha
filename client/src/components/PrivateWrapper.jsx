import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

// Used to protect the path from users that are not logged in. It redirect the user to the login page
export const PrivateWrapper = ({ children }) => {
  const { currentUser } = useAuth();

  return currentUser ? children : <Navigate to="/login" replace />;
};