import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Meme Bingo",
    short_name: "Meme Bingo",
    description:
      "Generate bingo cards from your favorite subreddits. Reroll, customize, and export for game night.",
    start_url: "/",
    display: "standalone",
    background_color: "#0d0d1a",
    theme_color: "#7c4dff",
    icons: [
      {
        src: "/icon",
        sizes: "32x32",
        type: "image/png",
      },
      {
        src: "/apple-icon",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
