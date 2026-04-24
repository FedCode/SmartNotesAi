import Header from "../components/Header";
import Footer from "../components/Footer";
import styles from "../style/Home.module.css";

const Home = () => {
  return (
    <>
      <Header />

      <main className={styles.main}>
        <h1>Automate Your Workflows</h1>
        <p>Build powerful automation with ease using our platform.</p>

        <div className={styles.actions}>
          <a href="/register" className={styles.primary}>Get Started</a>
          <a href="/login" className={styles.secondary}>Login</a>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default Home;