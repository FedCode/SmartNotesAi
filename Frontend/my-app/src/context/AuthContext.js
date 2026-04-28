import { Children, createContext, useContext, useEffect, useState } from "react";
import apiInstance from "../api/ApiInstance";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext(null);

export const AuthProvider = ({children}) =>{
    const navigate = useNavigate()
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    console.log("USER in AuthContext", user, loading)

    useEffect(()=>{
     const checkSessionStatus = async ()=>{
        try{
            const res = await apiInstance.get('/user/me');

            if(res.data.loggedIn){
             setUser(res.data.user)
            }
        }
        catch(err){
         setUser(null); // No active session
        }finally {
        setLoading(false);
      }
     }
      checkSessionStatus()   

    }, [])

    const login = async (email, password) => {
    const res = await apiInstance.post('/user/login', { email, password });
    setUser(res.data.user); // Store user data in state
  };

  const logout = async () => {
    await apiInstance.post('/user/logout');
    setUser(null);
    navigate('/login')
  };

  return(
    <AuthContext.Provider value={{user, loading, login, logout}}>
    {!loading && children}
    </AuthContext.Provider>
  )
}



export const useAuthContext = () => {
    return useContext(AuthContext);
};