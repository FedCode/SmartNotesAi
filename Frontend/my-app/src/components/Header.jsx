import styles from '../style/Header.module.css';
import {Link} from 'react-router';
const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>SmartNotesAI</div>

      <nav className={styles.nav}>
        <Link to="/login">Login</Link>
        <Link to="/register" className={styles.btn}>Register</Link>
      </nav>
    </header>
  );
};

export default Header;