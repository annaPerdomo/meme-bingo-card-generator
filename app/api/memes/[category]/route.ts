import { NextRequest, NextResponse } from "next/server";
import { getMemes } from "@/lib/meme-sources";
import { getCategoryBySlug } from "@/lib/categories";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ category: string }> },
) {
  const { category } = await params;
  const categoryConfig = getCategoryBySlug(category);

  if (!categoryConfig) {
    return NextResponse.json(
      { error: `Unknown category: ${category}` },
      { status: 404 },
    );
  }

  const memes = await getMemes(categoryConfig.slug, categoryConfig.subreddit);

  if (memes.length === 0) {
    return NextResponse.json(
      { error: "No memes found. Try again in a moment." },
      { status: 503 },
    );
  }

  return NextResponse.json(memes);
}
