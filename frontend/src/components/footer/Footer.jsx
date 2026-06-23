import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer__credit}>
        Made by{" "}
        <a
          href="https://github.com/cascabeanie"
          className={styles.footer__link}
        >
          cascabeanie
        </a>{" "}
        for{" "}
        <a href="https://cs50.harvard.edu/x/" className={styles.footer__link}>
          CS50x
        </a>
      </div>
    </footer>
  );
}
