
// import apiInstance from '../api/ApiInstance';
// import { useNavigate } from "react-router";
// import { toast } from "react-toastify";
// import {useAuthContext} from '../context/AuthContext'

// const Login = () => {
// const navigate = useNavigate()
// const { login } = useAuthContext();
// const loginHandler =  async(e)=>{
//        e.preventDefault();

//   const formData = new FormData(e.currentTarget)
//   const data = Object.fromEntries(formData.entries())

//   try{

//     //const response = await apiInstance.post('/user/login', data);
//     console.log("Response", response.data)
//     login()
//     if(response.data){
//       toast.success("Congratulation You Are Logged in")
//       navigate('/dashboard')
//     }
//     console.log('Login failed')
//   }
//   catch(err){
//     console.log("Server Error", err)
//     toast.error("Error While login try again")
//   }
// }

//   return (
//     <div className={styles.container}>
//       <div className={styles.card}>
//         <h2>Welcome Back</h2>
//         <p className={styles.subtext}>Login to your account</p>

//         <form className={styles.form} onSubmit={loginHandler}>
//           <input type="email" name="email" placeholder="Email" />
//           <input type="password" name="password" placeholder="Password" />

//           <button type="submit" className={styles.primaryBtn}>
//             Login
//           </button>
//         </form>

//         <p className={styles.switch}>
//           Don’t have an account? <Link to="/register">Register</Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Login;

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import { toast } from "react-toastify";
import styles from "../style/Auth.module.css";
import {Link} from 'react-router';
// Adjust path to your CSS

const Login = () => {
    const navigate = useNavigate();
    const { user, login, loading } = useAuthContext();

    // 1. If user is already logged in, send them to dashboard immediately
    useEffect(() => {
        if (!loading && user) {
            navigate('/dashboard');
        }
    }, [user, loading, navigate]);

    const loginHandler = async (e) => {
        e.preventDefault();
        
        const formData = new FormData(e.currentTarget);
        const { email, password } = Object.fromEntries(formData.entries());

        if (!email || !password) {
            return toast.error("Please fill in all fields");
        }

        try {
            // 2. We use the login function from our AuthContext
            // This handles the API call AND updates the global 'user' state
            await login(email, password);
            
            toast.success("Congratulations! You are logged in");
            navigate('/dashboard');
        } catch (err) {
            console.error("Login error:", err);
            const message = err.response?.data?.msg || "Invalid email or password";
            toast.error(message);
        }
    };

    if (loading) return null; // Avoid flickering while checking session

    return (
      <div className={styles.container}>
            <div className={styles.card}>
                <h2>Login to SmartNotesAI</h2>
                <p className={styles.subtext}>Start your journey</p>
            <form className={styles.form} onSubmit={loginHandler}>
    
                
                <div className={styles.inputGroup}>
                    <label htmlFor="email">Email</label>
                    <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        required 
                        placeholder="your@email.com"
                    />
                </div>

                <div className={styles.inputGroup}>
                    <label htmlFor="password">Password</label>
                    <input 
                        type="password" 
                        id="password" 
                        name="password" 
                        required 
                        placeholder="••••••••"
                    />
                </div>

                <button type="submit" className={styles.loginBtn}>
                    Login
                </button>

                <p className={styles.switch}>
                    Don't have an account? <span onClick={() => navigate('/register')}>Register here</span>
                </p>
            </form>
            </div>
        </div>
    );
};

export default Login;