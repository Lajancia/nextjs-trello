import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";
export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.linkContainer}>
        <h1>Next Trello Drag and Drop</h1>
        <div>
          <Link className={styles.link} href="/dashboard">
            - Go to Dashboard
          </Link>
          <br />
          <Link className={styles.link} href="/login">
            - Go to Login
          </Link>
          <br />
          <a
            className={styles.link}
            href="https://github.com/Lajancia/nextjs-trello"
          >
            - Go to Github
          </a>
          <br />
          <a className={styles.link} href="http://soominlab.com/ko">
            - Go to SoominLab
          </a>
        </div>
      </div>
    </main>
  );
}
