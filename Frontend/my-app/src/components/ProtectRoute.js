import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { ClipLoader } from "react-spinners";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <ClipLoader color="#fff" size={150} />; // Prevents "flicker" to login page
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;