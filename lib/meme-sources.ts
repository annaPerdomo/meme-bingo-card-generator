import { Meme } from "@/types";
import { getSupabase } from "./supabase";

const CACHE_DURATION_HOURS = 24;

const memoryCache = new Map<string, { data: Meme[]; timestamp: number }>();
const MEMORY_CACHE_TTL = 5 * 60 * 1000;

function isImageUrl(url: string): boolean {
  try {
    const pathname = new URL(url).pathname.toLowerCase();
    return [".jpg", ".jpeg", ".png", ".gif", ".webp"].some((ext) =>
      pathname.endsWith(ext),
    );
  } catch {
    return false;
  }
}

interface RedditPost {
  data: {
    id: string;
    title: string;
    url: string;
    post_hint?: string;
    is_video?: boolean;
    over_18?: boolean;
    is_gallery?: boolean;
  };
}

async function fetchFromReddit(subreddit: string, allowNsfw = false): Promise<Meme[]> {
  const response = await fetch(
    `https://www.reddit.com/r/${subreddit}/hot.json?limit=100`,
    {
      headers: {
        "User-Agent": "MemeBingoCardGenerator/2.0 (Next.js App)",
      },
      next: { revalidate: 300 },
    },
  );

  if (!response.ok) {
    throw new Error(`Reddit API returned ${response.status}`);
  }

  const json = await response.json();
  const posts: RedditPost[] = json?.data?.children ?? [];

  return posts
    .filter((post) => {
      const d = post.data;
      return (
        !d.is_video &&
        (allowNsfw || !d.over_18) &&
        !d.is_gallery &&
        (d.post_hint === "image" || isImageUrl(d.url))
      );
    })
    .map((post) => ({
      id: post.data.id,
      url: post.data.url,
      title: post.data.title,
      category: subreddit.toLowerCase(),
    }));
}

interface ImgflipMeme {
  id: string;
  name: string;
  url: string;
}

async function fetchFromImgflip(): Promise<Meme[]> {
  const response = await fetch("https://api.imgflip.com/get_memes");
  if (!response.ok) throw new Error("imgflip API failed");

  const json = await response.json();
  if (!json.success) throw new Error("imgflip returned unsuccessful response");

  return json.data.memes.map((meme: ImgflipMeme) => ({
    id: meme.id,
    url: meme.url,
    title: meme.name,
    category: "imgflip_fallback",
  }));
}

async function getCachedMemes(category: string): Promise<Meme[] | null> {
  const memoryCached = memoryCache.get(category);
  if (memoryCached && Date.now() - memoryCached.timestamp < MEMORY_CACHE_TTL) {
    return memoryCached.data;
  }

  const supabase = getSupabase();
  if (!supabase) return null;

  const cacheThreshold = new Date();
  cacheThreshold.setHours(cacheThreshold.getHours() - CACHE_DURATION_HOURS);

  const { data } = await supabase
    .from("memes")
    .select("*")
    .eq("category", category)
    .gte("cached_at", cacheThreshold.toISOString());

  if (data && data.length >= 20) {
    const memes = data.map((row) => ({
      id: row.external_id,
      url: row.url,
      title: row.title,
      category: row.category,
    }));
    memoryCache.set(category, { data: memes, timestamp: Date.now() });
    return memes;
  }

  return null;
}

async function cacheMemes(category: string, memes: Meme[]): Promise<void> {
  memoryCache.set(category, { data: memes, timestamp: Date.now() });

  const supabase = getSupabase();
  if (!supabase) return;

  await supabase.from("memes").upsert(
    memes.map((m) => ({
      external_id: m.id,
      category,
      url: m.url,
      title: m.title,
      cached_at: new Date().toISOString(),
    })),
    { onConflict: "category,url" },
  );
}

export async function getMemes(
  category: string,
  subreddit: string,
  allowNsfw = false,
): Promise<Meme[]> {
  const cacheKey = allowNsfw ? `${category}:nsfw` : category;
  const cached = await getCachedMemes(cacheKey);
  if (cached) return cached;

  try {
    const memes = await fetchFromReddit(subreddit, allowNsfw);
    if (memes.length > 0) {
      await cacheMemes(cacheKey, memes);
      return memes;
    }
  } catch (error) {
    console.error(`Reddit fetch failed for r/${subreddit}:`, error);
  }

  try {
    const memes = await fetchFromImgflip();
    return memes;
  } catch (error) {
    console.error("imgflip fallback also failed:", error);
    return [];
  }
}
