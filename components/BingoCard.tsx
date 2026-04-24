"use client";

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import MemeSquare from "./MemeSquare";
import { Meme, GridSize } from "@/types";

interface BingoCardProps {
  memes: Meme[];
  gridSize: GridSize;
  onReroll: (index: number) => void;
  interactive?: boolean;
  freeSpace?: boolean;
}

const bingoConfig = [
  { letter: "B", color: "primary.main", glow: "124, 77, 255" },
  { letter: "I", color: "secondary.main", glow: "255, 64, 129" },
  { letter: "N", color: "info.main", glow: "0, 229, 255" },
  { letter: "G", color: "success.main", glow: "0, 230, 118" },
  { letter: "O", color: "warning.main", glow: "255, 171, 64" },
];

export default function BingoCard({
  memes,
  gridSize,
  onReroll,
  interactive = true,
  freeSpace = false,
}: BingoCardProps) {
  const columns = gridSize === "3x3" ? 3 : gridSize === "4x4" ? 4 : 5;
  const totalCells = columns * columns;
  const hasFreeSpace = freeSpace && gridSize !== "4x4";
  const freeIndex = hasFreeSpace ? Math.floor(totalCells / 2) : -1;
  const letters = bingoConfig.slice(0, columns);

  return (
    <Paper
      sx={{
        maxWidth: 960,
        mx: "auto",
        overflow: "hidden",
        border: "1px solid rgba(124, 77, 255, 0.15)",
        boxShadow:
          "0 0 80px rgba(124, 77, 255, 0.06), 0 25px 50px rgba(0, 0, 0, 0.4)",
        borderRadius: 3,
      }}
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
          gridTemplateRows: `auto repeat(${columns}, 1fr)`,
          gap: "2px",
          bgcolor: "rgba(124, 77, 255, 0.08)",
          p: "2px",
        }}
      >
        {letters.map(({ letter, color, glow }) => (
          <Box
            key={letter}
            sx={{
              textAlign: "center",
              py: { xs: 0.75, sm: 1 },
              bgcolor: "background.paper",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                color,
                fontWeight: 800,
                fontSize: { xs: "1rem", sm: "1.3rem" },
                textShadow: interactive
                  ? `0 0 20px rgba(${glow}, 0.4)`
                  : "none",
                lineHeight: 1,
              }}
            >
              {letter}
            </Typography>
          </Box>
        ))}

        {Array.from({ length: totalCells }).map((_, cellIndex) => {
          if (cellIndex === freeIndex) {
            return (
              <Box
                key="free-space"
                sx={{
                  aspectRatio: "1",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  bgcolor: "background.paper",
                  position: "relative",
                  overflow: "hidden",
                  "&::before": interactive
                    ? {
                        content: '""',
                        position: "absolute",
                        inset: 0,
                        background:
                          "radial-gradient(circle, rgba(124, 77, 255, 0.12) 0%, transparent 70%)",
                        animation: "freePulse 3s ease-in-out infinite",
                        "@keyframes freePulse": {
                          "0%, 100%": { opacity: 0.5 },
                          "50%": { opacity: 1 },
                        },
                      }
                    : undefined,
                }}
              >
                <AutoAwesomeIcon
                  sx={{
                    fontSize: { xs: 24, sm: 32, md: 40 },
                    color: "primary.light",
                    mb: 0.5,
                    filter: interactive
                      ? "drop-shadow(0 0 8px rgba(179, 136, 255, 0.5))"
                      : "none",
                  }}
                />
                <Typography
                  variant="h6"
                  sx={{
                    color: "primary.light",
                    fontWeight: 800,
                    fontSize: { xs: "0.75rem", sm: "0.9rem", md: "1.1rem" },
                    letterSpacing: "0.15em",
                  }}
                >
                  FREE
                </Typography>
              </Box>
            );
          }

          const memeIndex =
            hasFreeSpace && cellIndex > freeIndex
              ? cellIndex - 1
              : cellIndex;

          return (
            <MemeSquare
              key={`${memes[memeIndex].id}-${memeIndex}`}
              meme={memes[memeIndex]}
              onClick={() => onReroll(memeIndex)}
              interactive={interactive}
            />
          );
        })}
      </Box>
    </Paper>
  );
}
