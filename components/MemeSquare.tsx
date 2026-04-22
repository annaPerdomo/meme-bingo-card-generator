"use client";

import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { Meme } from "@/types";

interface MemeSquareProps {
  meme: Meme;
  onClick: () => void;
  interactive?: boolean;
}

export default function MemeSquare({
  meme,
  onClick,
  interactive = true,
}: MemeSquareProps) {
  return (
    <Paper
      elevation={1}
      onClick={interactive ? onClick : undefined}
      sx={{
        cursor: interactive ? "pointer" : "default",
        overflow: "hidden",
        aspectRatio: "1",
        position: "relative",
        border: "1px solid",
        borderColor: "divider",
        transition: "transform 0.15s, box-shadow 0.15s",
        ...(interactive && {
          "&:hover": {
            transform: "scale(1.02)",
            boxShadow: 3,
          },
        }),
      }}
    >
      <Box
        component="img"
        src={meme.url}
        alt={meme.title}
        crossOrigin="anonymous"
        sx={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
        }}
      />
    </Paper>
  );
}
