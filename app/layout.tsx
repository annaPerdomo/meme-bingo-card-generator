import type { Metadata } from "next";
import { Baloo_2, Space_Grotesk } from "next/font/google";
import ThemeRegistry from "@/components/ThemeRegistry";

const displayFont = Baloo_2({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700", "800"],
});

const bodyFont = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Meme Bingo | The Internet's Spiciest Card Generator",
  description:
    "Generate bingo cards from your favorite subreddits. Reroll, customize, and export for game night.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${displayFont.variable} ${bodyFont.variable}`}>
        <ThemeRegistry>{children}</ThemeRegistry>
      </body>
    </html>
  );
}
