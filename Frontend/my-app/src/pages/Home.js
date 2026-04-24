import Header from "../components/Header";
import Footer from "../components/Footer";
import styles from "../style/Home.module.css";
import {Link} from 'react-router'

const Home = () => {
  return (
    <>
      <Header />

      <main className={styles.main}>
        <h1>Automate Your Workflows</h1>
        <p>Build powerful automation with ease using our platform.</p>

        <div className={styles.actions}>
          <Link to="/register" className={styles.primary}>Get Started</Link>
          <Link to="/login" className={styles.secondary}>Login</Link>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default Home;