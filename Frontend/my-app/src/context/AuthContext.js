
import { createContext, useContext, useEffect, useState } from "react";
import apiInstance from "../api/ApiInstance";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';


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
                // ✅ Fetch tasks immediately after login
                const taskRes = await apiInstance.get(`/tasks/${res.data.user._id}`);
                if(taskRes.data.success){
                    setTasks(taskRes.data.task.taskList || []);
                }
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

const handlerEdittask = async (userID, taskID, taskdata)=>{
  try{
       const result = await apiInstance.patch(`/tasks/edit/${taskID}`, taskdata);

       if(result.data.success){
       // ✅ Update state so UI reflects immediately
            setTasks((prevTasks) => prevTasks.map(task =>
                task.taskID === taskID
                    ? { ...task, tasks: taskdata }
                    : task
            ));

       }
  }
  catch(err){
    console.log("Server Error", err)
  }
}

       
//    Delete Task
    const deletTaskHandler = async (taskID)=>{
        try{
           const result = await apiInstance.delete(`/tasks/delete/${taskID}`);
                     //const taskRes = await apiInstance.get(`/tasks/${res.data.user._id}`);
                    if(result.data.success){
                          console.log('Result after Delete', result.data)
                                   setTasks((prevTasks) => prevTasks.filter(task => task.taskID !== taskID));
                                    console.log('Task deleted:', taskID);
                                    toast.success('Task Delete Successfully!')

                    }
                
           }
        catch(err){
            console.log("Server Error", err )
        }
    }

   console.log("User After Login", user) 
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

    // const toggleStatushandler = async(taskID, status)=>{

    //     try{
    //        const newStatus = status === 'completed' ? 'pending': 'completed';

    //         const result = await apiInstance.patch(`/user/status/${taskID}`, { status: newStatus });
    //         if(result.data.success){
    //          setTasks(prevTasks => 
    //             prevTasks.map(task => 
    //                 task._id === taskID 
    //                 ? {tasks: { status: newStatus } } 
    //                 : task
    //             )
    //         );
    //         }
    //     }
    //     catch(err){
    //       console.log("Error", err)
    //     }
    // }

    return (
        <AuthContext.Provider value={{user, loading, login, logout, createTask, tasks, deletTaskHandler, handlerEdittask }}>
            {!loading && children}
        </AuthContext.Provider>
    );
}

export const useAuthContext = () => {
    return useContext(AuthContext);
};