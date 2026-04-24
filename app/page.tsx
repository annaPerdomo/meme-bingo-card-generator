"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import Fade from "@mui/material/Fade";
import LinearProgress from "@mui/material/LinearProgress";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ControlPanel from "@/components/ControlPanel";
import BingoCard from "@/components/BingoCard";
import { Meme, GridSize } from "@/types";
import { exportToPdf } from "@/lib/pdf-export";

const printTheme = createTheme({
  palette: {
    mode: "light",
    text: { primary: "#1a1a2e", secondary: "#4a4a6a" },
    background: { default: "#ffffff", paper: "#ffffff" },
    primary: { main: "#5c3cbf" },
    secondary: { main: "#d63369" },
    info: { main: "#0097a7" },
    success: { main: "#2e7d32" },
    warning: { main: "#e65100" },
    divider: "rgba(0, 0, 0, 0.12)",
  },
  typography: {
    fontFamily: 'var(--font-body), "Space Grotesk", sans-serif',
    h4: {
      fontFamily: 'var(--font-display), "Baloo 2", sans-serif',
      fontWeight: 800,
    },
    h6: {
      fontFamily: 'var(--font-display), "Baloo 2", sans-serif',
      fontWeight: 700,
    },
  },
});

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

const bingoLetterColors = [
  { letter: "B", color: "#7c4dff", glow: "124, 77, 255" },
  { letter: "I", color: "#ff4081", glow: "255, 64, 129" },
  { letter: "N", color: "#00e5ff", glow: "0, 229, 255" },
  { letter: "G", color: "#00e676", glow: "0, 230, 118" },
  { letter: "O", color: "#ffab40", glow: "255, 171, 64" },
];

const DEMO_COLS = 3;
const DEMO_TOTAL = DEMO_COLS * DEMO_COLS;
const DEMO_FREE_IDX = Math.floor(DEMO_TOTAL / 2);
const DEMO_MEME_SLOTS = DEMO_TOTAL - 1;

function AnimatedDemoCard() {
  const [tiles, setTiles] = useState<Meme[]>([]);
  const [exitingIdx, setExitingIdx] = useState<number | null>(null);
  const poolRef = useRef<Meme[]>([]);
  const loadedRef = useRef(false);

  useEffect(() => {
    fetch("/api/memes/memes")
      .then((r) => r.json())
      .then((data: Meme[]) => {
        if (!Array.isArray(data) || data.length < DEMO_MEME_SLOTS + 5) return;
        const shuffled = [...data].sort(() => Math.random() - 0.5);
        setTiles(shuffled.slice(0, DEMO_MEME_SLOTS));
        poolRef.current = shuffled.slice(DEMO_MEME_SLOTS);
        loadedRef.current = true;
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!loadedRef.current || poolRef.current.length === 0) return;

      const targetIdx = Math.floor(Math.random() * DEMO_MEME_SLOTS);
      const poolPick = Math.floor(Math.random() * poolRef.current.length);

      setExitingIdx(targetIdx);

      setTimeout(() => {
        setTiles((prev) => {
          if (prev.length === 0) return prev;
          const updated = [...prev];
          const incoming = poolRef.current[poolPick];
          poolRef.current = [
            ...poolRef.current.slice(0, poolPick),
            updated[targetIdx],
            ...poolRef.current.slice(poolPick + 1),
          ];
          updated[targetIdx] = incoming;
          return updated;
        });
        setExitingIdx(null);
      }, 280);
    }, 1800);

    return () => clearInterval(interval);
  }, []);

  const tileSize = { xs: 72, sm: 88 };
  let memeSlot = 0;

  return (
    <Box
      sx={{
        display: "inline-grid",
        gridTemplateColumns: `repeat(${DEMO_COLS}, 1fr)`,
        gap: "3px",
        p: "3px",
        borderRadius: 2,
        overflow: "hidden",
        bgcolor: "rgba(124, 77, 255, 0.15)",
        boxShadow:
          "0 0 40px rgba(124, 77, 255, 0.2), 0 16px 40px rgba(0,0,0,0.45)",
        border: "1px solid rgba(124, 77, 255, 0.25)",
      }}
    >
      {Array.from({ length: DEMO_TOTAL }).map((_, cellIdx) => {
        if (cellIdx === DEMO_FREE_IDX) {
          return (
            <Box
              key="free"
              sx={{
                width: tileSize,
                height: tileSize,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: "background.paper",
                borderRadius: 1,
              }}
            >
              <Typography sx={{ fontSize: { xs: "1.4rem", sm: "1.7rem" }, lineHeight: 1 }}>
                ✨
              </Typography>
              <Typography
                sx={{
                  fontSize: { xs: "0.5rem", sm: "0.58rem" },
                  fontWeight: 800,
                  color: "primary.light",
                  letterSpacing: "0.1em",
                  mt: 0.4,
                }}
              >
                FREE
              </Typography>
            </Box>
          );
        }

        const slot = memeSlot;
        const isExiting = exitingIdx === slot;
        memeSlot++;
        const tile = tiles[slot];

        if (!tile) {
          return (
            <Box
              key={cellIdx}
              sx={{
                width: tileSize,
                height: tileSize,
                borderRadius: 1,
                bgcolor: "rgba(124, 77, 255, 0.08)",
                animation: "skeletonPulse 1.6s ease-in-out infinite",
                animationDelay: `${slot * 0.1}s`,
                "@keyframes skeletonPulse": {
                  "0%, 100%": { opacity: 0.4 },
                  "50%": { opacity: 0.8 },
                },
              }}
            />
          );
        }

        return (
          <Box
            key={cellIdx}
            sx={{
              width: tileSize,
              height: tileSize,
              borderRadius: 1,
              overflow: "hidden",
              transition: "opacity 0.28s ease, transform 0.28s ease",
              opacity: isExiting ? 0 : 1,
              transform: isExiting ? "scale(0.85)" : "scale(1)",
            }}
          >
            <Box
              component="img"
              src={tile.url}
              alt=""
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
            />
          </Box>
        );
      })}
    </Box>
  );
}

function EmptyState() {
  return (
    <Box sx={{ textAlign: "center", maxWidth: 560, px: 3 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: { xs: 0.5, sm: 1.5 },
          mb: 3,
        }}
      >
        {bingoLetterColors.map(({ letter, color, glow }, i) => (
          <Typography
            key={letter}
            variant="h1"
            sx={{
              fontSize: { xs: "3.5rem", sm: "4.5rem", md: "5.5rem" },
              lineHeight: 1,
              color,
              textShadow: `0 0 40px rgba(${glow}, 0.4), 0 0 80px rgba(${glow}, 0.15)`,
              animation: `float 3s ease-in-out ${i * 0.15}s infinite`,
              "@keyframes float": {
                "0%, 100%": { transform: "translateY(0)" },
                "50%": { transform: "translateY(-8px)" },
              },
            }}
          >
            {letter}
          </Typography>
        ))}
      </Box>

      <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
        <AnimatedDemoCard />
      </Box>

      <Typography
        variant="caption"
        sx={{
          display: "block",
          color: "text.disabled",
          mb: 2,
          letterSpacing: "0.05em",
          fontSize: "0.7rem",
        }}
      >
        tiles auto-reroll · click any square to swap it
      </Typography>

      <Typography
        variant="h5"
        sx={{ color: "text.primary", mb: 1.5, fontWeight: 700 }}
      >
        The internet, on a bingo card.
      </Typography>
      <Typography
        variant="body1"
        sx={{ color: "text.secondary", lineHeight: 1.7 }}
      >
        Pick a subreddit, choose your grid size, and get a fresh card loaded
        with real memes. Tap any square to swap it out.
      </Typography>
    </Box>
  );
}

export default function Home() {
  const [category, setCategory] = useState("memes");
  const [gridSize, setGridSize] = useState<GridSize>("5x5");
  const [memePool, setMemePool] = useState<Meme[]>([]);
  const [displayedMemes, setDisplayedMemes] = useState<Meme[]>([]);
  const [variations, setVariations] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showCard, setShowCard] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPrinting, setIsPrinting] = useState(false);
  const [printVariations, setPrintVariations] = useState<Meme[][]>([]);
  const [freeSpace, setFreeSpace] = useState(true);

  const totalCells = gridSize === "3x3" ? 9 : gridSize === "4x4" ? 16 : 25;
  const memeCount = totalCells - (freeSpace && gridSize !== "4x4" ? 1 : 0);

  const handleGridSizeChange = useCallback((size: GridSize) => {
    setGridSize(size);
    setShowCard(false);
    setDisplayedMemes([]);
    setMemePool([]);
    if (size === "4x4") setFreeSpace(false);
  }, []);

  const generateCard = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/memes/${category}`);
      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error || "Failed to fetch memes");
      }

      const memes: Meme[] = await response.json();

      if (memes.length < memeCount) {
        throw new Error(
          `Not enough memes found (got ${memes.length}, need ${memeCount}). Try a different category.`,
        );
      }

      const shuffled = shuffleArray(memes);
      setDisplayedMemes(shuffled.slice(0, memeCount));
      setMemePool(shuffled.slice(memeCount));
      setShowCard(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }, [category, memeCount]);

  const rerollMeme = useCallback(
    (index: number) => {
      if (memePool.length === 0) return;

      const newPool = [...memePool];
      const randomIdx = Math.floor(Math.random() * newPool.length);
      const newMeme = newPool.splice(randomIdx, 1)[0];

      setDisplayedMemes((prev) => {
        const updated = [...prev];
        newPool.push(updated[index]);
        updated[index] = newMeme;
        return updated;
      });
      setMemePool(newPool);
    },
    [memePool],
  );

  const handlePrint = useCallback(() => {
    const allVariations: Meme[][] = [displayedMemes];
    for (let i = 1; i < variations; i++) {
      allVariations.push(shuffleArray([...displayedMemes]));
    }
    setPrintVariations(allVariations);
    setIsPrinting(true);
  }, [displayedMemes, variations]);

  useEffect(() => {
    if (!isPrinting || printVariations.length === 0) return;

    let cancelled = false;

    const capture = async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      if (cancelled) return;

      const elementIds = printVariations.map(
        (_, i) => `bingoCard-print-${i}`,
      );

      try {
        await exportToPdf(elementIds);
      } catch (err) {
        console.error("PDF export failed:", err);
        setError("PDF export failed. Please try again.");
      }

      if (!cancelled) {
        setIsPrinting(false);
        setPrintVariations([]);
      }
    };

    capture();

    return () => {
      cancelled = true;
    };
  }, [isPrinting, printVariations]);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "background.default",
        position: "relative",
        "&::before": {
          content: '""',
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          background: `
            radial-gradient(ellipse at 10% 0%, rgba(124, 77, 255, 0.08), transparent 50%),
            radial-gradient(ellipse at 90% 10%, rgba(0, 229, 255, 0.05), transparent 45%),
            radial-gradient(ellipse at 50% 100%, rgba(255, 64, 129, 0.04), transparent 50%)
          `,
          zIndex: 0,
        },
      }}
    >
      {loading && (
        <LinearProgress
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            zIndex: 1300,
            height: 3,
          }}
        />
      )}

      <ControlPanel
        category={category}
        onCategoryChange={setCategory}
        gridSize={gridSize}
        onGridSizeChange={handleGridSizeChange}
        freeSpace={freeSpace}
        onFreeSpaceChange={setFreeSpace}
        variations={variations}
        onVariationsChange={setVariations}
        onGenerate={generateCard}
        onPrint={handlePrint}
        loading={loading}
        isPrinting={isPrinting}
        showCard={showCard}
        memePoolSize={memePool.length}
      />

      <Box
        sx={{
          minHeight: "100vh",
          pt: { xs: 2, sm: 3, md: 4 },
          pb: { xs: 10, md: 12 },
          px: { xs: 1, sm: 2, md: 3 },
          pl: { xs: 1, sm: 30, md: 40 },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: showCard ? "flex-start" : "center",
          position: "relative",
          zIndex: 1,
        }}
      >
        {error && (
          <Alert severity="error" sx={{ mb: 2, maxWidth: 960, width: "100%" }}>
            {error}
          </Alert>
        )}

        {showCard && displayedMemes.length > 0 ? (
          <Fade in timeout={500}>
            <Box sx={{ width: "100%", maxWidth: 960 }}>
              <BingoCard
                memes={displayedMemes}
                gridSize={gridSize}
                onReroll={rerollMeme}
                freeSpace={freeSpace}
              />
            </Box>
          </Fade>
        ) : (
          !loading && (
            <Fade in timeout={400}>
              <Box>
                <EmptyState />
              </Box>
            </Fade>
          )
        )}
      </Box>

      {isPrinting && printVariations.length > 0 && (
        <Box
          sx={{
            position: "fixed",
            left: "-9999px",
            top: 0,
            width: 800,
          }}
        >
          <ThemeProvider theme={printTheme}>
            {printVariations.map((memes, i) => (
              <Box
                key={i}
                id={`bingoCard-print-${i}`}
                sx={{
                  width: 800,
                  p: 2,
                  bgcolor: "#ffffff",
                }}
              >
                <BingoCard
                  memes={memes}
                  gridSize={gridSize}
                  onReroll={() => {}}
                  interactive={false}
                  freeSpace={freeSpace}
                />
              </Box>
            ))}
          </ThemeProvider>
        </Box>
      )}
    </Box>
  );
}
