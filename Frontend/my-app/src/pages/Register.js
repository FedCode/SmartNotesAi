import { use, useState } from "react";
import styles from "../style/Auth.module.css";
import {Link} from 'react-router';
import { useNavigate } from 'react-router-dom';

import apiInstance from '../api/ApiInstance';
//import { useNavigate } from "react-router";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  const navigate = useNavigate();
 //const [error, setError] = useState()
   const handleRegisterForm =  async (e)=>{
     e.preventDefault();

       const formData = new FormData(e.currentTarget)
  //using Desctrure
    // const email = formData.get('email');
    // const name = formData.get('name');
    // const password = formData.get('password');
    ///const {name, email, password} = formData;
    const data = Object.fromEntries(formData.entries());
    try {
    const response = await apiInstance.post('/user/register', data);

    // FIX: Access the 'data' property from the Axios response
    if (response.data && response.data.success) {
        toast.success("Registered successfully!", {
            icon: "🚀"
        });
        //toast("Register Succesfully")

      
        console.log("Response User:", response.data.user);
      setTimeout(() => {
        navigate('/login');
        
    }, 1500); // 1.5 seconds
    } else {
        // Handle cases where the server returns 200 but success is false
        toast.error(response.data.message || "Registration failed");
    }
} catch (err) {
    console.log("Server Error", err);
    
    // Capture the actual error message from your backend
    const errorMessage = err.response?.data?.message || "Something went wrong";
    toast.error(errorMessage);
}
   
   }


  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2>Create Account</h2>
        <p className={styles.subtext}>Start your journey</p>
          <ToastContainer />
        <form className={styles.form} onSubmit={handleRegisterForm}>
          <input type="text" name="name" placeholder="Full Name" />
          <input type="email" name='email' placeholder="Email" />
          <input type="password" name='password' placeholder="Password" />

          <button type="submit" className={styles.primaryBtn}>
            Register
          </button>
        </form>

        <p className={styles.switch}>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;