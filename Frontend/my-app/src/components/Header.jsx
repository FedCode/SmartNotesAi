import styles from '../style/Header.module.css';
import {Link} from 'react-router';
import { useAuthContext } from '../context/AuthContext';
const Header = () => {
const { user, logout } = useAuthContext();
console.log("USER IN Header", user, logout)
  return (
    <header className={styles.header}>
      <div className={styles.container}>
      <div className={styles.logo}>SmartNotesAI</div>

      <nav className={styles.nav}>
        
       {user ? (
          <>
            <Link to="/dashboard" className={styles.navLink}>Dashboard</Link>
            <button onClick={logout} className={styles.btn}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className={styles.navLink}>Login</Link>
            <Link to="/register" className={styles.btn}>Register</Link>
          </>
        ) } 
      </nav>
      </div>
    </header>
  );
};

export default Header;