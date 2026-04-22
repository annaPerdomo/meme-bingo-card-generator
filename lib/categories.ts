import { Category } from "@/types";

export const categories: Category[] = [
  // Original categories
  {
    slug: "programmerHumor",
    displayName: "Programming",
    subreddit: "ProgrammerHumor",
  },
  {
    slug: "dndmemes",
    displayName: "Dungeons & Dragons",
    subreddit: "dndmemes",
  },
  {
    slug: "Overwatch_Memes",
    displayName: "Overwatch",
    subreddit: "Overwatch_Memes",
  },
  {
    slug: "wholesomememes",
    displayName: "Wholesome",
    subreddit: "wholesomememes",
  },
  {
    slug: "prequelmemes",
    displayName: "Star Wars Prequels",
    subreddit: "PrequelMemes",
  },
  {
    slug: "SequelMemes",
    displayName: "Star Wars Sequels",
    subreddit: "SequelMemes",
  },
  {
    slug: "lotrmemes",
    displayName: "Lord of the Rings",
    subreddit: "lotrmemes",
  },
  {
    slug: "historymemes",
    displayName: "History",
    subreddit: "historymemes",
  },
  { slug: "lolcats", displayName: "Cats", subreddit: "lolcats" },
  { slug: "dankmemes", displayName: "Dank", subreddit: "dankmemes" },

  // Top meme subreddits
  { slug: "memes", displayName: "Memes (General)", subreddit: "memes" },
  { slug: "me_irl", displayName: "Me IRL", subreddit: "me_irl" },
  {
    slug: "AdviceAnimals",
    displayName: "Advice Animals",
    subreddit: "AdviceAnimals",
  },
  {
    slug: "BikiniBottomTwitter",
    displayName: "SpongeBob",
    subreddit: "BikiniBottomTwitter",
  },
  {
    slug: "shitposting",
    displayName: "Shitposting",
    subreddit: "shitposting",
  },
  {
    slug: "surrealmemes",
    displayName: "Surreal",
    subreddit: "surrealmemes",
  },
  {
    slug: "blursedimages",
    displayName: "Blursed Images",
    subreddit: "blursedimages",
  },
  {
    slug: "technicallythetruth",
    displayName: "Technically the Truth",
    subreddit: "technicallythetruth",
  },
  {
    slug: "MemeEconomy",
    displayName: "Meme Economy",
    subreddit: "MemeEconomy",
  },
  {
    slug: "comedyheaven",
    displayName: "Comedy Heaven",
    subreddit: "comedyheaven",
  },
];

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}
