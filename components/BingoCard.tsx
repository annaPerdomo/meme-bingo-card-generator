"use client";

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import MemeSquare from "./MemeSquare";
import { Meme, GridSize } from "@/types";

interface BingoCardProps {
  memes: Meme[];
  gridSize: GridSize;
  onReroll: (index: number) => void;
  interactive?: boolean;
}

export default function BingoCard({
  memes,
  gridSize,
  onReroll,
  interactive = true,
}: BingoCardProps) {
  const columns = gridSize === "3x3" ? 3 : 4;

  return (
    <Paper
      elevation={3}
      sx={{
        p: 2,
        maxWidth: 800,
        mx: "auto",
        backgroundColor: "background.paper",
      }}
    >
      <Typography
        variant="h4"
        align="center"
        sx={{
          mb: 2,
          background: "linear-gradient(135deg, #6C63FF 0%, #FF6584 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        Meme Bingo!
      </Typography>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
          gap: 1,
        }}
      >
        {memes.map((meme, index) => (
          <MemeSquare
            key={`${meme.id}-${index}`}
            meme={meme}
            onClick={() => onReroll(index)}
            interactive={interactive}
          />
        ))}
      </Box>
    </Paper>
  );
}
