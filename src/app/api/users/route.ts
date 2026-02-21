import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email } = await req.json();

  if (!email) {
    return NextResponse.json({ error: "Email required" }, { status: 400 });
  }

  const client = await clientPromise;
  const db = client.db("app");
  const users = db.collection("users");

  let user = await users.findOne({ email });

  if (!user) {
    await users.insertOne({
      email,
      artists: [],
    });
  }

  return NextResponse.json({ email });
}
