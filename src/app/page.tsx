"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [email, setEmail] = useState("");
  const router = useRouter();

  async function submit() {
    if (!email) return;

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
      />

      <button onClick={submit}>Continue</button>
    </main>
  );
}
