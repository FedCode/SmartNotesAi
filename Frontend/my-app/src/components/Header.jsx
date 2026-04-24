import styles from '../style/Header.module.css';
const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>SmartNotesAI</div>

      <nav className={styles.nav}>
        <a href="/login">Login</a>
        <a href="/register" className={styles.btn}>Register</a>
      </nav>
    </header>
  );
};

export default Header;