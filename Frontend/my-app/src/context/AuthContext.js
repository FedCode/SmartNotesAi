// import { Children, createContext, useContext, useEffect, useState } from "react";
// import apiInstance from "../api/ApiInstance";
// import { useNavigate } from "react-router-dom";

// const AuthContext = createContext(null);

// export const AuthProvider = ({children}) =>{
//     const navigate = useNavigate()
//     const [user, setUser] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [tasks, setTasks] = useState([])
//     console.log("USER in AuthContext", user, loading)

//     useEffect(()=>{
//      const checkSessionStatus = async ()=>{
//         try{
//             const res = await apiInstance.get('/user/me', {withCredentials:true});

//             if(res.data.loggedIn){
//              setUser(res.data.user)
//              console.log("user ID", res.data.user._id) 
//              const taskRes = await apiInstance.get(`/tasks/${res.data.user._id}`, {withCredentials:true});
//              console.log("UseeEfefct on DashbPOrad",taskRes)
//              if(taskRes.data.success){
//                setTasks(taskRes.data.task.taskList)
//                 console.log("Tasks response From Backend:", taskRes.data); 
//              }
//             }
//         }
//         catch(err){
//          setUser(null); // No active session
//         }finally {
//         setLoading(false);
//       }
//      }
//       checkSessionStatus()   

 
//     }, [])
//     // Get User Data 
//     // const getDataByUserID = async()=>{
//     //     try{
//     //       const id = user._id;
//     //       const response = await apiInstance.get(`/tasks/:${user.id}`, {withCredentials:true})
//     //       const data = response.json();
//     //       console.log("Get by UserID", data)
//     //       return data
//     //     }
//     //     catch(err){
//     //       console.log("Server Error", err)
//     //     } 
//     // }  
//     const createTask = async(taskData)=>{
    
//         try{
        
//           const response = await apiInstance.post(`/task/create`, {userID:user._id, tasks:taskData}, {withCredentials:true})
//           const data = response.data
//           if(data.success){
//           setTasks((prevTasks) => [...(prevTasks || []), data.task])
           
//           }
         
       
         
//         }
//         catch(err){
//           console.log("Server Error", err)
//         } 
//     }  

//     const login = async (email, password) => {
//     const res = await apiInstance.post('/user/login', { email, password });
//     setUser(res.data.user); // Store user data in state
//   };

//   const logout = async () => {
//     await apiInstance.post('/user/logout');
//     setUser(null);
//     navigate('/login')
//   };
 
//   // if(loading){
//   //   return <div>.....Loadding</div>
//   // }
//   return(
//     <AuthContext.Provider value={{user, loading, login, logout, createTask, tasks}}>
//     {!loading && children}
//     </AuthContext.Provider>
//   )
// }



// export const useAuthContext = () => {
//     return useContext(AuthContext);
// };
import { createContext, useContext, useEffect, useState } from "react";
import apiInstance from "../api/ApiInstance";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext(null);

export const AuthProvider = ({children}) => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const checkSessionStatus = async () => {
            try {
                const res = await apiInstance.get('/user/me');

                if(res.data.loggedIn && res.data.user) {
                    setUser(res.data.user);
                    
                    const taskRes = await apiInstance.get(`/tasks/${res.data.user._id}`);
                    if(taskRes.data.success){
                        setTasks(taskRes.data.task.taskList || []);
                    }
                } else {
                    setUser(null); // ✅ explicit null
                }
            } catch(err) {
                setUser(null); // ✅ explicit null
            } finally {
                setLoading(false);
            }
        }
        checkSessionStatus();
    }, []); // ✅ empty array — runs once only

    const login = async (email, password) => {
        try {
            const res = await apiInstance.post('/user/login', { email, password });
            if(res.data.success && res.data.user) {
                setUser(res.data.user); // ✅ only set if exists
            } else {
                setUser(null);
                throw new Error(res.data.msg || "Login failed");
            }
        } catch(err) {
            setUser(null); // ✅ explicit null on error
            throw err; // re-throw so Login.js can catch it
        }
    };

    const createTask = async (taskData) => {
        try {
            const response = await apiInstance.post(`/task/create`, {
                userID: user._id, 
                tasks: taskData
            });
            const data = response.data;
            if(data.success) {
                setTasks((prevTasks) => [...(prevTasks || []), data.task]);
            }
        } catch(err) {
            console.log("Server Error", err);
        }
    };

    const logout = async () => {
        try {
            await apiInstance.post('/user/logout');
        } catch(err) {
            console.log("Logout error", err);
        } finally {
            setUser(null);
            setTasks([]);
            navigate('/login');
        }
    };

    return (
        <AuthContext.Provider value={{user, loading, login, logout, createTask, tasks}}>
            {!loading && children}
        </AuthContext.Provider>
    );
}

export const useAuthContext = () => {
    return useContext(AuthContext);
};