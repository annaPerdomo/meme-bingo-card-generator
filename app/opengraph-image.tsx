import { ImageResponse } from "next/og";

export const alt = "Meme Bingo - The Internet's Spiciest Card Generator";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  const letters = [
    { letter: "B", color: "#7c4dff" },
    { letter: "I", color: "#ff4081" },
    { letter: "N", color: "#00e5ff" },
    { letter: "G", color: "#00e676" },
    { letter: "O", color: "#ffab40" },
  ];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(145deg, #0d0d1a 0%, #1a1a2e 50%, #16213e 100%)",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", gap: "16px", marginBottom: "32px" }}>
          {letters.map(({ letter, color }) => (
            <div
              key={letter}
              style={{
                fontSize: "96px",
                fontWeight: 800,
                color,
              }}
            >
              {letter}
            </div>
          ))}
        </div>

        <div
          style={{
            display: "flex",
            gap: "6px",
            padding: "16px",
            background: "rgba(124, 77, 255, 0.12)",
            borderRadius: "16px",
            border: "1px solid rgba(124, 77, 255, 0.25)",
            marginBottom: "40px",
          }}
        >
          {Array.from({ length: 9 }).map((_, i) => (
            <div
              key={i}
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "6px",
                background:
                  i === 4
                    ? "linear-gradient(135deg, #7c4dff, #d63369)"
                    : "rgba(255, 255, 255, 0.08)",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            />
          ))}
        </div>

        <div
          style={{
            fontSize: "28px",
            color: "rgba(255, 255, 255, 0.7)",
            fontWeight: 500,
          }}
        >
          Generate bingo cards from your favorite subreddits
        </div>
      </div>
    ),
    { ...size },
  );
}
