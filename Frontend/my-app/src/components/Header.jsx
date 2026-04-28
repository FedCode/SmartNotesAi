import styles from '../style/Header.module.css';
import {Link} from 'react-router';
const Header = () => {
  const token  = localStorage.getItem('token')
  return (
    <header className={styles.header}>
      <div className={styles.logo}>SmartNotesAI</div>

      <nav className={styles.nav}>
        
       {token ? (<Link to="/dashboard" className={styles.btn}>Dashboard</Link>):(<><Link to="/login">Login</Link><Link to="/register" className={styles.btn}>Register</Link></>) } 
      </nav>
    </header>
  );
};

export default Header;