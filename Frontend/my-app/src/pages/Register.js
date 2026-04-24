import styles from "../style/Auth.module.css";

const Register = () => {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2>Create Account</h2>
        <p className={styles.subtext}>Start your journey</p>

        <form className={styles.form}>
          <input type="text" placeholder="Full Name" />
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />

          <button type="submit" className={styles.primaryBtn}>
            Register
          </button>
        </form>

        <p className={styles.switch}>
          Already have an account? <a href="/login">Login</a>
        </p>
      </div>
    </div>
  );
};

export default Register;