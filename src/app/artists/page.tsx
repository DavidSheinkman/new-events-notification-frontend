"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./artists.module.css";


export default function ArtistsPage() {
  const router = useRouter();
  const [artists, setArtists] = useState<string[]>([]);
  const [artist, setArtist] = useState("");
  const [loadingList, setLoadingList] = useState(true);

  const email =
    typeof window !== "undefined"
      ? localStorage.getItem("email")
      : null;

  useEffect(() => {
    if (!email) {
      router.push("/");
      return;
    }
    loadArtists();
  }, []);

  async function loadArtists() {
    setLoadingList(true);
    const res = await fetch("/api/artists", {
      headers: { email: email! },
    });
    setArtists(await res.json());
    setLoadingList(false);
  }

  async function addArtist() {
    await fetch("/api/artists", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, artist }),
    });
    setArtist("");
    loadArtists();
  }

  async function deleteArtist(name: string) {
    await fetch("/api/artists", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, artist: name }),
    });
    loadArtists();
  }

  return (
    <div className={styles.page}>
      <header className={styles.topBar}>
        <span className={styles.logo}>RA</span>
        {email && <span className={styles.userEmail}>{email}</span>}
      </header>

      <main className={styles.main}>
        <h1 className={styles.pageTitle}>Your artists</h1>
        <p className={styles.artistCount}>
          {loadingList ? "Loading…" : `${artists.length} artist${artists.length !== 1 ? "s" : ""} tracked`}
        </p>

        {/* Add row */}
        <div className={styles.addRow}>
          <input
            className={styles.addInput}
            value={artist}
            onChange={e => setArtist(e.target.value)}
            placeholder="Artist name"
            onKeyDown={e => e.key === "Enter" && addArtist()}
          />
          <button className={styles.addButton} onClick={addArtist}>
            Add
          </button>
        </div>

        <p className={styles.inputHint}>
          Enter the name exactly as it appears on{" "}
          <a className={styles.inputHintLink} href="https://ra.co" target="_blank" rel="noopener noreferrer">
            ra.co
          </a>
        </p>

        {/* List */}
        <p className={styles.sectionLabel}>Following</p>

        {loadingList ? (
          <ul className={styles.skeletonList}>
            {[0, 1, 2, 3].map(i => (
              <li key={i} className={styles.skeletonItem}>
                <div className={styles.skeletonBar} />
              </li>
            ))}
          </ul>
        ) : artists.length === 0 ? (
          <p className={styles.empty}>No artists yet — add one above</p>
        ) : (
           <ul className={styles.list}>
            {[...artists].sort((a, b) => a.localeCompare(b)).map(a => (
              <li key={a} className={styles.listItem}>
                <span className={styles.artistName}>{a}</span>
                <button className={styles.deleteBtn} onClick={() => deleteArtist(a)}>
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </main>

      <footer className={styles.footer}>
        <span>Privacy Policy</span>
        <span>Terms of Use</span>
        <span>© RA {new Date().getFullYear()}</span>
      </footer>
    </div>
  );
}
