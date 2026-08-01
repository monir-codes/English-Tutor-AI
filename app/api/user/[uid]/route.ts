import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db/connect";
import User from "@/models/User";
import Story from "@/models/Story";

export async function GET(req: NextRequest, { params }: { params: Promise<{ uid: string }> }) {
  try {
    const resolvedParams = await params;
    await connectDB();
    const user = await User.findOne({ firebaseUid: resolvedParams.uid });
    
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const completedStories = await Story.countDocuments({ userId: resolvedParams.uid });

    return NextResponse.json({
      xp: user.xp,
      streak: user.streak,
      level: user.level,
      completedStories,
    });
  } catch (error: any) {
    return NextResponse.json({ error: "Failed to fetch user" }, { status: 500 });
  }
}
