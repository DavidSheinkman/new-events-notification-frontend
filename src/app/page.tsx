"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";

export default function Home() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function submit() {
    if (!email) return;

    setLoading(true);

    await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    localStorage.setItem("email", email);
    router.push("/artists");
  }

  return (
    <div className={styles.page}>
      <header className={styles.topBar}>
        <span className={styles.logo}>RA</span>
        <span className={styles.topBarRight}>Electronic Music &amp; Culture</span>
      </header>

      <main className={styles.center}>
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <p className={styles.eyebrow}>Welcome back</p>
            <h1 className={styles.heading}>Sign in</h1>
          </div>

          <div className={styles.cardBody}>
            <p className={styles.fieldLabel}>Email address</p>
            <input
              className={styles.input}
              placeholder="your@email.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              disabled={loading}
              type="email"
            />
            <button
              className={styles.button}
              onClick={submit}
              disabled={loading}
            >
              Continue
            </button>
          </div>

          {loading && (
            <div className={styles.spinnerOverlay}>
              <div className={styles.spinner} />
              <span className={styles.spinnerLabel}>Signing you in…</span>
            </div>
          )}
        </div>
      </main>

      <footer className={styles.footer}>
        <span>Privacy Policy</span>
        <span>Terms of Use</span>
        <span>© RA {new Date().getFullYear()}</span>
      </footer>
    </div>
  );
}
