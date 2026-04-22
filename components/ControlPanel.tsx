"use client";

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Divider from "@mui/material/Divider";
import CasinoIcon from "@mui/icons-material/Casino";
import PrintIcon from "@mui/icons-material/Print";
import { categories } from "@/lib/categories";
import { GridSize } from "@/types";

interface ControlPanelProps {
  category: string;
  onCategoryChange: (category: string) => void;
  gridSize: GridSize;
  onGridSizeChange: (size: GridSize) => void;
  variations: number;
  onVariationsChange: (num: number) => void;
  onGenerate: () => void;
  onPrint: () => void;
  loading: boolean;
  isPrinting: boolean;
  showCard: boolean;
  memePoolSize: number;
}

export default function ControlPanel({
  category,
  onCategoryChange,
  gridSize,
  onGridSizeChange,
  variations,
  onVariationsChange,
  onGenerate,
  onPrint,
  loading,
  isPrinting,
  showCard,
  memePoolSize,
}: ControlPanelProps) {
  return (
    <Paper
      elevation={2}
      sx={{
        p: 3,
        height: { md: "100vh" },
        overflowY: "auto",
        position: { md: "sticky" },
        top: 0,
      }}
    >
      <Typography variant="h6" gutterBottom>
        Meme Bingo Generator
      </Typography>

      <Divider sx={{ mb: 3 }} />

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
        <FormControl fullWidth size="small">
          <InputLabel>Meme Category</InputLabel>
          <Select
            value={category}
            label="Meme Category"
            onChange={(e: SelectChangeEvent) => onCategoryChange(e.target.value)}
          >
            {categories.map((cat) => (
              <MenuItem key={cat.slug} value={cat.slug}>
                {cat.displayName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth size="small">
          <InputLabel>Grid Size</InputLabel>
          <Select
            value={gridSize}
            label="Grid Size"
            onChange={(e: SelectChangeEvent) =>
              onGridSizeChange(e.target.value as GridSize)
            }
          >
            <MenuItem value="3x3">3x3 (9 memes)</MenuItem>
            <MenuItem value="4x4">4x4 (16 memes)</MenuItem>
          </Select>
        </FormControl>

        <Button
          variant="contained"
          fullWidth
          onClick={onGenerate}
          disabled={loading}
          startIcon={
            loading && !isPrinting ? (
              <CircularProgress size={20} color="inherit" />
            ) : (
              <CasinoIcon />
            )
          }
          size="large"
        >
          {loading && !isPrinting
            ? "Loading Memes..."
            : showCard
              ? "Generate New Card"
              : "Generate Bingo Card"}
        </Button>

        {showCard && (
          <>
            <Divider />

            <Typography variant="body2" color="text.secondary">
              Click any meme square to reroll it.
              {memePoolSize > 0 && ` (${memePoolSize} memes available)`}
            </Typography>

            <TextField
              label="Number of Variations"
              type="number"
              size="small"
              fullWidth
              value={variations}
              onChange={(e) => {
                const val = parseInt(e.target.value, 10);
                onVariationsChange(val < 1 || isNaN(val) ? 1 : val);
              }}
              slotProps={{ htmlInput: { min: 1, max: 50 } }}
            />

            <Button
              variant="outlined"
              fullWidth
              onClick={onPrint}
              disabled={isPrinting}
              startIcon={
                isPrinting ? (
                  <CircularProgress size={20} color="inherit" />
                ) : (
                  <PrintIcon />
                )
              }
              size="large"
            >
              {isPrinting ? "Generating PDF..." : "Export to PDF"}
            </Button>
          </>
        )}
      </Box>
    </Paper>
  );
}
