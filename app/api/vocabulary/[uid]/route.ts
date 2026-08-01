import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db/connect";
import Story from "@/models/Story";

export async function GET(req: NextRequest, { params }: { params: Promise<{ uid: string }> }) {
  try {
    const resolvedParams = await params;
    await connectDB();
    
    // Find all stories by this user
    const stories = await Story.find({ userId: resolvedParams.uid });
    
    // Extract all vocabulary
    const allVocab = stories.reduce((acc, story) => {
      return acc.concat(story.vocabulary);
    }, [] as any[]);

    // Deduplicate by english word
    const uniqueVocab = Array.from(
      new Map(allVocab.map((item: any) => [item.english.toLowerCase(), item])).values()
    );

    return NextResponse.json({ vocabulary: uniqueVocab });
  } catch (error: any) {
    console.error("Vocab fetch failed:", error);
    return NextResponse.json({ error: "Failed to fetch vocabulary" }, { status: 500 });
  }
}
