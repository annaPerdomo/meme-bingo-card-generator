"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import CasinoIcon from "@mui/icons-material/Casino";
import FitScreenIcon from "@mui/icons-material/FitScreen";
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
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragStart = useRef({ x: 0, y: 0 });
  const panStart = useRef({ x: 0, y: 0 });
  const hasMoved = useRef(false);

  const isZoomed = zoom > 1.01;

  // Reset zoom when meme changes (reroll)
  useEffect(() => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  }, [meme.id]);

  // Wheel-to-zoom with passive: false to prevent page scroll
  useEffect(() => {
    const el = containerRef.current;
    if (!el || !interactive) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      setZoom((prev) => {
        const next = Math.max(1, Math.min(3, prev - e.deltaY * 0.003));
        if (next <= 1) setPan({ x: 0, y: 0 });
        return next;
      });
    };

    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => el.removeEventListener("wheel", handleWheel);
  }, [interactive]);

  // Document-level listeners during drag so mouse can leave the square
  useEffect(() => {
    if (!dragging) return;

    const handleMove = (e: MouseEvent) => {
      const dx = e.clientX - dragStart.current.x;
      const dy = e.clientY - dragStart.current.y;
      if (Math.abs(dx) > 3 || Math.abs(dy) > 3) hasMoved.current = true;
      setPan({
        x: panStart.current.x + dx / zoom,
        y: panStart.current.y + dy / zoom,
      });
    };

    const handleUp = () => setDragging(false);

    document.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseup", handleUp);
    return () => {
      document.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseup", handleUp);
    };
  }, [dragging, zoom]);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (!interactive || zoom <= 1) return;
      e.preventDefault();
      setDragging(true);
      hasMoved.current = false;
      dragStart.current = { x: e.clientX, y: e.clientY };
      panStart.current = { ...pan };
    },
    [interactive, zoom, pan],
  );

  const handleClick = useCallback(() => {
    if (!interactive) return;
    if (hasMoved.current) {
      hasMoved.current = false;
      return;
    }
    onClick();
  }, [interactive, onClick]);

  const handleReset = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setZoom(1);
    setPan({ x: 0, y: 0 });
  }, []);

  return (
    <Box
      ref={containerRef}
      onClick={handleClick}
      onMouseDown={handleMouseDown}
      {...(interactive && {
        role: "button",
        tabIndex: 0,
        "aria-label": `Reroll meme: ${meme.title}`,
        onKeyDown: (e: React.KeyboardEvent) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleClick();
          }
        },
      })}
      sx={{
        cursor: interactive
          ? dragging
            ? "grabbing"
            : isZoomed
              ? "grab"
              : "pointer"
          : "default",
        overflow: "hidden",
        aspectRatio: "1",
        position: "relative",
        bgcolor: "background.paper",
        transition: "all 0.25s ease",
        userSelect: "none",
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
            "& .zoom-reset": {
              opacity: 1,
            },
            ...(!isZoomed && {
              "& img": {
                transform: "scale(1.06)",
              },
            }),
          },
        }),
      }}
    >
      <Box
        component="img"
        src={meme.url}
        alt={meme.title}
        crossOrigin="anonymous"
        draggable={false}
        sx={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
          display: "block",
          transition: dragging ? "none" : "transform 0.3s ease",
          transform: isZoomed
            ? `scale(${zoom}) translate(${pan.x}px, ${pan.y}px)`
            : undefined,
          pointerEvents: "none",
        }}
      />

      {interactive && (
        <>
          {isZoomed && (
            <Box
              className="zoom-reset"
              onClick={handleReset}
              sx={{
                position: "absolute",
                top: { xs: 4, sm: 6 },
                left: { xs: 4, sm: 6 },
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
                transition: "all 0.2s ease",
                color: "#ffffff",
                cursor: "pointer",
                "&:hover": {
                  bgcolor: "rgba(124, 77, 255, 0.85)",
                },
              }}
            >
              <FitScreenIcon sx={{ fontSize: { xs: 12, sm: 14 } }} />
            </Box>
          )}

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
