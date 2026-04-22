export interface Meme {
  id: string;
  url: string;
  title: string;
  category: string;
}

export interface Category {
  slug: string;
  displayName: string;
  subreddit: string;
}

export type GridSize = "3x3" | "4x4";
