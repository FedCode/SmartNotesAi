import styles from "../style/Auth.module.css";
import {Link} from 'react-router';
import apiInstance from '../api/ApiInstance';
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const Login = () => {
const navigate = useNavigate()
const loginHandler =  async(e)=>{
       e.preventDefault();

  const formData = new FormData(e.currentTarget)
  const data = Object.fromEntries(formData.entries())

  try{
    const response = await apiInstance.post('/user/login', data);
    console.log("Response", response.data)
    
    if(response.data){
      toast.success("Congratulation You Are Logged in")
      localStorage.setItem('token', response.data.token)
      navigate('/dashboard')
    }
    console.log('Login failed')
  }
  catch(err){
    console.log("Server Error", err)
    toast.error("Error While login try again")
  }
}

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2>Welcome Back</h2>
        <p className={styles.subtext}>Login to your account</p>

        <form className={styles.form} onSubmit={loginHandler}>
          <input type="email" name="email" placeholder="Email" />
          <input type="password" name="password" placeholder="Password" />

          <button type="submit" className={styles.primaryBtn}>
            Login
          </button>
        </form>

        <p className={styles.switch}>
          Don’t have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;