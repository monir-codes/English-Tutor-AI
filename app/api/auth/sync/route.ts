import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db/connect";
import User from "@/models/User";

export async function POST(req: NextRequest) {
  try {
    const { firebaseUid, email, name } = await req.json();

    if (!firebaseUid || !email) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    await connectDB();

    // Check if user exists
    let user = await User.findOne({ firebaseUid });

    if (!user) {
      // Create new user
      user = await User.create({
        firebaseUid,
        email,
        name,
        xp: 0,
        level: "Beginner",
        streak: 0,
      });
    }

    return NextResponse.json({ success: true, user });
  } catch (error: any) {
    console.error("Auth sync error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
