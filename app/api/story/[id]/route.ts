import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db/connect";
import Story from "@/models/Story";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const resolvedParams = await params;
    await connectDB();
    const story = await Story.findById(resolvedParams.id);
    
    if (!story) {
      return NextResponse.json({ error: "Story not found" }, { status: 404 });
    }

    return NextResponse.json(story);
  } catch (error: any) {
    return NextResponse.json({ error: "Failed to fetch story" }, { status: 500 });
  }
}
