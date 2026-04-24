import styles from "../style/Auth.module.css";
const Login = () => {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2>Welcome Back</h2>
        <p className={styles.subtext}>Login to your account</p>

        <form className={styles.form}>
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />

          <button type="submit" className={styles.primaryBtn}>
            Login
          </button>
        </form>

        <p className={styles.switch}>
          Don’t have an account? <a href="/register">Register</a>
        </p>
      </div>
    </div>
  );
};

export default Login;