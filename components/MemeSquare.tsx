"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import CasinoIcon from "@mui/icons-material/Casino";
import { Meme } from "@/types";

interface MemeSquareProps {
  meme: Meme;
  onClick: () => void;
  interactive?: boolean;
}

function SquareContent({
  meme,
  onClick,
  interactive,
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
            "& .meme-overlay": {
              opacity: 1,
            },
            "& .meme-title-bar": {
              opacity: 1,
              transform: "translateY(0)",
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
            className="meme-overlay"
            sx={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(180deg, rgba(8, 11, 24, 0) 40%, rgba(8, 11, 24, 0.75) 100%)",
              opacity: 0,
              transition: "opacity 0.25s ease",
              pointerEvents: "none",
            }}
          />

          <Box
            className="meme-title-bar"
            sx={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              px: { xs: 0.75, sm: 1 },
              py: { xs: 0.5, sm: 0.75 },
              opacity: 0,
              transform: "translateY(4px)",
              transition: "all 0.25s ease",
              pointerEvents: "none",
              zIndex: 3,
            }}
          >
            <Typography
              sx={{
                color: "#ffffff",
                fontSize: { xs: "0.55rem", sm: "0.65rem", md: "0.72rem" },
                lineHeight: 1.3,
                fontWeight: 500,
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                textShadow: "0 1px 3px rgba(0,0,0,0.5)",
              }}
            >
              {meme.title}
            </Typography>
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

export default function MemeSquare({
  meme,
  onClick,
  interactive = true,
}: MemeSquareProps) {
  if (!interactive) {
    return (
      <SquareContent meme={meme} onClick={onClick} interactive={false} />
    );
  }

  return (
    <Tooltip title={meme.title} placement="top" enterDelay={600}>
      <Box>
        <SquareContent meme={meme} onClick={onClick} interactive />
      </Box>
    </Tooltip>
  );
}
