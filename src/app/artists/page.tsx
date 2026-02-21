"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ArtistsPage() {
  const router = useRouter();
  const [artists, setArtists] = useState<string[]>([]);
  const [artist, setArtist] = useState("");

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
    const res = await fetch("/api/artists", {
      headers: { email: email! },
    });
    setArtists(await res.json());
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
    <main style={{ padding: 40 }}>
      <h1>Your artists</h1>

      <input
        value={artist}
        onChange={e => setArtist(e.target.value)}
        placeholder="Artist name"
      />
      <button onClick={addArtist}>Add</button>

      <ul>
        {artists.map(a => (
          <li key={a}>
            {a}
            <button onClick={() => deleteArtist(a)}>❌</button>
          </li>
        ))}
      </ul>
    </main>
  );
}
