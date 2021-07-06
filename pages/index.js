import Head from "next/head";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";

export default function Home() {
  const [origin, setOrigin] = useState("http://example.com");

  useEffect(() => setOrigin(window.location.origin), []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Hits!</title>
        <meta name="description" content="A hit counter badge generator!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.box}>
        <pre>
          <code>
            ![Hit counter]({origin}/<span className={styles.muted}>USER</span>/
            <span className={styles.muted}>REPO</span>.svg)
          </code>
        </pre>
        <div className={styles.subtitle}>A hit count badge generator.</div>
      </div>
    </div>
  );
}
