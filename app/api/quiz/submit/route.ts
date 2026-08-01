import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db/connect";
import User from "@/models/User";

export async function POST(req: NextRequest) {
  try {
    const { firebaseUid, storyId, score, total, xp } = await req.json();

    if (!firebaseUid) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const user = await User.findOne({ firebaseUid });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Calculate XP earned
    const earnedXp = Math.round((score / total) * xp);
    
    user.xp += earnedXp;
    // Add logic to update streak, level up, etc.
    if (user.xp >= 1000) user.level = "Elementary";
    if (user.xp >= 3000) user.level = "Intermediate";
    if (user.xp >= 6000) user.level = "Advanced";

    await user.save();

    return NextResponse.json({ success: true, earnedXp, totalXp: user.xp });
  } catch (error: any) {
    console.error("Quiz submit failed:", error);
    return NextResponse.json(
      { error: "Failed to submit quiz", details: error.message },
      { status: 500 }
    );
  }
}
