import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import { ClipLoader } from "react-spinners";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuthContext();

  if (loading) return (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
         <ClipLoader color="#36d7b7" size={150} />
      </div>

)// Prevents "flicker" to login page
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;