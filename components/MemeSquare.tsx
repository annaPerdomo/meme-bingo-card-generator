"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import CasinoIcon from "@mui/icons-material/Casino";
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
    <Box
      onClick={interactive ? onClick : undefined}
      sx={{
        cursor: interactive ? "pointer" : "default",
        overflow: "hidden",
        aspectRatio: "1",
        position: "relative",
        bgcolor: "background.paper",
        transition: "all 0.25s ease",
        ...(interactive && {
          "&:hover": {
            zIndex: 2,
            boxShadow: "0 0 20px rgba(124, 77, 255, 0.25)",
            "& .post-link": {
              opacity: 1,
              transform: "scale(1)",
            },
            "& .reroll-badge": {
              opacity: 1,
              transform: "scale(1)",
            },
            "& img": {
              transform: "scale(1.06)",
            },
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
          transition: "transform 0.4s ease",
        }}
      />

      {interactive && (
        <>
          <Box
            className="post-link"
            component="a"
            href={`https://reddit.com/comments/${meme.id}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e: React.MouseEvent) => e.stopPropagation()}
            sx={{
              position: "absolute",
              bottom: { xs: 4, sm: 6 },
              right: { xs: 4, sm: 6 },
              zIndex: 3,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: { xs: 22, sm: 26 },
              height: { xs: 22, sm: 26 },
              borderRadius: 1,
              bgcolor: "rgba(0, 0, 0, 0.6)",
              backdropFilter: "blur(4px)",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              opacity: 0,
              transform: "scale(0.8)",
              transition: "all 0.2s ease",
              color: "#ffffff",
              textDecoration: "none",
              "&:hover": {
                bgcolor: "rgba(124, 77, 255, 0.85)",
              },
            }}
          >
            <OpenInNewIcon sx={{ fontSize: { xs: 12, sm: 14 } }} />
          </Box>

          <Box
            className="reroll-badge"
            sx={{
              position: "absolute",
              top: { xs: 4, sm: 6 },
              right: { xs: 4, sm: 6 },
              zIndex: 3,
              display: "flex",
              alignItems: "center",
              gap: 0.3,
              px: { xs: 0.5, sm: 0.75 },
              py: 0.3,
              borderRadius: 1,
              bgcolor: "rgba(124, 77, 255, 0.85)",
              backdropFilter: "blur(4px)",
              border: "1px solid rgba(179, 136, 255, 0.3)",
              opacity: 0,
              transform: "scale(0.8)",
              transition: "all 0.2s ease",
              pointerEvents: "none",
            }}
          >
            <CasinoIcon sx={{ fontSize: 10, color: "#ffffff" }} />
            <Typography
              sx={{
                fontSize: "0.55rem",
                fontWeight: 700,
                color: "#ffffff",
                lineHeight: 1,
                letterSpacing: "0.04em",
                display: { xs: "none", sm: "block" },
              }}
            >
              REROLL
            </Typography>
          </Box>
        </>
      )}
    </Box>
  );
}
