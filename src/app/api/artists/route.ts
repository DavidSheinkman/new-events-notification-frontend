import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const email = req.headers.get("email");

  if (!email) {
    return NextResponse.json([], { status: 400 });
  }

  const client = await clientPromise;
  const db = client.db("app");

  const user = await db.collection("users").findOne({ email });

  return NextResponse.json(user?.artists || []);
}

export async function POST(req: Request) {
  const { email, artist } = await req.json();

  if (!email || !artist) {
    return NextResponse.json({ error: "Missing data" }, { status: 400 });
  }

  const client = await clientPromise;
  const db = client.db("app");

  await db.collection("users").updateOne(
    { email },
    { $addToSet: { artists: artist } }
  );

  const existingArtist = await db.collection("artists").findOne({ name: artist.name });
  if (!existingArtist) {
    await db.collection("artists").insertOne({ name: artist, events: [] });
  }

  return NextResponse.json({ ok: true });
}

export async function DELETE(req: Request) {
  const { email, artist } = await req.json();

  const client = await clientPromise;
  const db = client.db("app");

  await db.collection("users").updateOne(
    { email },
    { $pull: { artists: artist } }
  );

  return NextResponse.json({ ok: true });
}
