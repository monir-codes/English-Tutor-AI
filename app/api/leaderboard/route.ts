import { NextResponse } from "next/server";
import connectDB from "@/lib/db/connect";
import User from "@/models/User";

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await connectDB();
    
    // Get top 50 users sorted by XP descending
    const users = await User.find({})
      .sort({ xp: -1 })
      .limit(50)
      .select("name level xp streak firebaseUid");

    return NextResponse.json({ users });
  } catch (error: any) {
    console.error("Leaderboard fetch failed:", error);
    return NextResponse.json({ error: "Failed to fetch leaderboard" }, { status: 500 });
  }
}
