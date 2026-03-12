"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./loading.module.css";

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
    <main style={{ padding: 40 }}>
      <h1>Login</h1>

      <input
        placeholder="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        disabled={loading}
      />

      <button onClick={submit} disabled={loading}>
        Continue
      </button>

      {loading && (
        <div className={styles.spinnerOverlay}>
          <div className={styles.spinner} />
          <span className={styles.spinnerLabel}>Signing you in…</span>
        </div>
      )}
    </main>
  );
}
