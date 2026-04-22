"use client";

import { useState, useEffect, useCallback } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import ControlPanel from "@/components/ControlPanel";
import BingoCard from "@/components/BingoCard";
import { Meme, GridSize } from "@/types";
import { exportToPdf } from "@/lib/pdf-export";

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function Home() {
  const [category, setCategory] = useState("memes");
  const [gridSize, setGridSize] = useState<GridSize>("3x3");
  const [memePool, setMemePool] = useState<Meme[]>([]);
  const [displayedMemes, setDisplayedMemes] = useState<Meme[]>([]);
  const [variations, setVariations] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showCard, setShowCard] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPrinting, setIsPrinting] = useState(false);
  const [printVariations, setPrintVariations] = useState<Meme[][]>([]);

  const gridCount = gridSize === "3x3" ? 9 : 16;

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

      if (memes.length < gridCount) {
        throw new Error(
          `Not enough memes found (got ${memes.length}, need ${gridCount}). Try a different category.`,
        );
      }

      const shuffled = shuffleArray(memes);
      setDisplayedMemes(shuffled.slice(0, gridCount));
      setMemePool(shuffled.slice(gridCount));
      setShowCard(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }, [category, gridCount]);

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
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        minHeight: "100vh",
        backgroundColor: "background.default",
      }}
    >
      <Box
        sx={{
          width: { xs: "100%", md: 320 },
          flexShrink: 0,
        }}
      >
        <ControlPanel
          category={category}
          onCategoryChange={setCategory}
          gridSize={gridSize}
          onGridSizeChange={setGridSize}
          variations={variations}
          onVariationsChange={setVariations}
          onGenerate={generateCard}
          onPrint={handlePrint}
          loading={loading}
          isPrinting={isPrinting}
          showCard={showCard}
          memePoolSize={memePool.length}
        />
      </Box>

      <Box
        sx={{
          flex: 1,
          p: { xs: 2, md: 4 },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: showCard ? "flex-start" : "center",
          minHeight: { xs: "60vh", md: "auto" },
        }}
      >
        {error && (
          <Alert severity="error" sx={{ mb: 2, maxWidth: 800, width: "100%" }}>
            {error}
          </Alert>
        )}

        {showCard && displayedMemes.length > 0 ? (
          <Box sx={{ width: "100%", maxWidth: 800 }}>
            <BingoCard
              memes={displayedMemes}
              gridSize={gridSize}
              onReroll={rerollMeme}
            />
          </Box>
        ) : (
          !loading && (
            <Box sx={{ textAlign: "center", color: "text.secondary" }}>
              <Typography variant="h1" sx={{ fontSize: "5rem", mb: 2 }}>
                🎰
              </Typography>
              <Typography variant="h5" gutterBottom>
                Ready to make some bingo cards?
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Select a meme category and hit Generate!
              </Typography>
            </Box>
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
          {printVariations.map((memes, i) => (
            <Box
              key={i}
              id={`bingoCard-print-${i}`}
              sx={{ width: 800, p: 2, backgroundColor: "white" }}
            >
              <BingoCard
                memes={memes}
                gridSize={gridSize}
                onReroll={() => {}}
                interactive={false}
              />
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
}
