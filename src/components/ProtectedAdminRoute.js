// ProtectedAdminRoute.js
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedAdminRoute = ({ children }) => {
  const user = useSelector((state) => state.user); // Assuming your Redux state stores the user

  if (!user || !user.uid) {
    // If the user is not logged in or doesn't exist, redirect to login page
    return <Navigate to="/admin-login" />;
  }

  return children; // Render children if authenticated
};

export default ProtectedAdminRoute;
