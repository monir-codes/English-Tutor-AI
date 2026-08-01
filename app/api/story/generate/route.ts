import { NextRequest, NextResponse } from "next/server";
import { generateStory } from "@/services/gemini/client";
import connectDB from "@/lib/db/connect";
import Story from "@/models/Story";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { category, difficulty, firebaseUid } = body;

    if (!category || !difficulty) {
      return NextResponse.json({ error: "Missing category or difficulty" }, { status: 400 });
    }

    const storyData = await generateStory({ category, difficulty });
    
    await connectDB();
    const savedStory = await Story.create({
      ...storyData,
      userId: firebaseUid, // Add this if you want to track who generated it, optional
    });

    return NextResponse.json({ success: true, storyId: savedStory._id });
  } catch (error: any) {
    console.error("Story generation failed:", error);
    return NextResponse.json(
      { error: "Failed to generate story", details: error.message },
      { status: 500 }
    );
  }
}
