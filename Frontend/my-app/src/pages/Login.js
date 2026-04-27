import styles from "../style/Auth.module.css";
import {Link} from 'react-router';
import apiInstance from '../api/ApiInstance';
import { useNavigate } from "react-router";
const Login = () => {
  const navigate = useNavigate()
const loginHandler =  async(e)=>{
  const formData = new FormData(e.currentTarget)
  const data = Object.fromEntries(formData)
  try{
    const response = apiInstance.post('/user/login', data);
    console.log("Response" . response.data)
    if(response.data){
      alert('Login SuccessFully !')
      navigate('/')
    }
    console.log('Login failed')
  }
  catch(err){
    console.log("Server Error", err)
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