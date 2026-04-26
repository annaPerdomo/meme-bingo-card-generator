"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import CasinoIcon from "@mui/icons-material/Casino";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
import ShuffleIcon from "@mui/icons-material/Shuffle";
import { categories } from "@/lib/categories";
import { GridSize } from "@/types";

interface ControlPanelProps {
  category: string;
  onCategoryChange: (category: string) => void;
  gridSize: GridSize;
  onGridSizeChange: (size: GridSize) => void;
  freeSpace: boolean;
  onFreeSpaceChange: (val: boolean) => void;
  includeGifs: boolean;
  onIncludeGifsChange: (val: boolean) => void;
  allowNsfw: boolean;
  onAllowNsfwChange: (val: boolean) => void;
  variations: number;
  onVariationsChange: (num: number) => void;
  onGenerate: () => void;
  onPrint: () => void;
  loading: boolean;
  isPrinting: boolean;
  showCard: boolean;
  memePoolSize: number;
}

const glassStyle = {
  bgcolor: "rgba(15, 21, 37, 0.82)",
  backdropFilter: "blur(20px)",
  border: "1px solid rgba(124, 77, 255, 0.12)",
  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4)",
};

export default function ControlPanel({
  category,
  onCategoryChange,
  gridSize,
  onGridSizeChange,
  freeSpace,
  onFreeSpaceChange,
  includeGifs,
  onIncludeGifsChange,
  allowNsfw,
  onAllowNsfwChange,
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
    <Box
      sx={{
        position: "fixed",
        top: { xs: 8, md: 16 },
        left: { xs: 8, md: 16 },
        zIndex: 1100,
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
        gap: 2.5,
        px: 3,
        py: 3,
        borderRadius: 3,
        width: { xs: 220, md: 280 },
        ...glassStyle,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <ElectricBoltIcon sx={{ color: "warning.main", fontSize: 28 }} />
        <Typography
          variant="h5"
          sx={{
            background: "linear-gradient(135deg, #b388ff, #00e5ff)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontSize: { xs: "1.25rem", md: "1.5rem" },
            lineHeight: 1.1,
          }}
        >
          Meme Bingo
        </Typography>
      </Box>

      <Typography variant="body2" sx={{ color: "text.secondary", mt: -1.5 }}>
        The internet&apos;s spiciest card generator. Build it, reroll it, export it.
      </Typography>

      <Divider />

      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        <Typography
          variant="overline"
          sx={{ color: "text.secondary", lineHeight: 1 }}
        >
          Pick Your Poison
        </Typography>
        <Select
          value={category}
          onChange={(e: SelectChangeEvent) => onCategoryChange(e.target.value)}
          size="small"
          fullWidth
          sx={{
            "& .MuiSelect-select": { py: 1.25, fontSize: "0.9rem" },
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "rgba(255, 255, 255, 0.1)",
            },
          }}
        >
          {categories.map((cat) => (
            <MenuItem key={cat.slug} value={cat.slug}>
              {cat.displayName}
            </MenuItem>
          ))}
        </Select>
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        <Typography
          variant="overline"
          sx={{ color: "text.secondary", lineHeight: 1 }}
        >
          Board Size
        </Typography>
        <ToggleButtonGroup
          value={gridSize}
          exclusive
          onChange={(_, val) => val && onGridSizeChange(val as GridSize)}
          size="small"
          fullWidth
        >
          <ToggleButton value="3x3" sx={{ flex: 1, py: 1, fontSize: "0.85rem" }}>
            3x3
          </ToggleButton>
          <ToggleButton value="4x4" sx={{ flex: 1, py: 1, fontSize: "0.85rem" }}>
            4x4
          </ToggleButton>
          <ToggleButton value="5x5" sx={{ flex: 1, py: 1, fontSize: "0.85rem" }}>
            5x5
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>

      <FormControlLabel
        control={
          <Switch
            checked={freeSpace}
            onChange={(e) => onFreeSpaceChange(e.target.checked)}
            disabled={gridSize === "4x4"}
            size="small"
          />
        }
        label={
          <Typography variant="body2" sx={{ color: gridSize === "4x4" ? "text.disabled" : "text.secondary" }}>
            Free space
          </Typography>
        }
        sx={{ mx: 0 }}
      />

      <FormControlLabel
        control={
          <Switch
            checked={includeGifs}
            onChange={(e) => onIncludeGifsChange(e.target.checked)}
            size="small"
          />
        }
        label={
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            Include GIFs
          </Typography>
        }
        sx={{ mx: 0 }}
      />

      <FormControlLabel
        control={
          <Switch
            checked={allowNsfw}
            onChange={(e) => onAllowNsfwChange(e.target.checked)}
            size="small"
          />
        }
        label={
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            Allow NSFW
          </Typography>
        }
        sx={{ mx: 0 }}
      />

      <Button
        variant="contained"
        onClick={onGenerate}
        disabled={loading}
        startIcon={
          loading && !isPrinting ? (
            <CircularProgress size={18} color="inherit" />
          ) : (
            <CasinoIcon sx={{ fontSize: 20 }} />
          )
        }
        fullWidth
        sx={{
          py: 1.5,
          fontSize: "0.95rem",
          borderRadius: 2,
          background: "linear-gradient(135deg, #d81b60 0%, #d84315 100%)",
          boxShadow: "0 4px 16px rgba(216, 27, 96, 0.3)",
          "&:hover": {
            background: "linear-gradient(135deg, #c2185b 0%, #bf360c 100%)",
            boxShadow: "0 6px 24px rgba(194, 24, 91, 0.45)",
          },
        }}
      >
        {loading && !isPrinting
          ? "Loading..."
          : showCard
            ? "Regenerate Board"
            : "Generate"}
      </Button>

      {showCard && (
        <>
          <Divider />

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <ShuffleIcon sx={{ fontSize: 18, color: "text.disabled" }} />
            <Typography variant="body2" sx={{ color: "text.secondary", flex: 1 }}>
              Tap any square to reroll it
            </Typography>
            {memePoolSize > 0 && (
              <Chip
                label={memePoolSize}
                size="small"
                sx={{
                  bgcolor: "rgba(124, 77, 255, 0.2)",
                  color: "primary.light",
                  fontSize: "0.72rem",
                  fontWeight: 700,
                  height: 22,
                }}
              />
            )}
          </Box>

          {memePoolSize > 0 && (
            <Typography variant="caption" sx={{ color: "text.disabled", mt: -1.5 }}>
              Memes in the pool
            </Typography>
          )}

          <Divider />

          <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
            <Typography
              variant="overline"
              sx={{ color: "text.secondary", lineHeight: 1 }}
            >
              Export
            </Typography>
            <TextField
              label="Card Variations"
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
                  <CircularProgress size={16} color="inherit" />
                ) : (
                  <PictureAsPdfIcon />
                )
              }
              sx={{
                py: 1.25,
                borderRadius: 2,
                borderColor: "rgba(124, 77, 255, 0.4)",
                color: "primary.light",
                "&:hover": {
                  borderColor: "primary.light",
                  bgcolor: "rgba(124, 77, 255, 0.08)",
                },
              }}
            >
              {isPrinting ? "Generating..." : "Export to PDF"}
            </Button>
          </Box>
        </>
      )}

      <Divider />

      <Typography variant="caption" sx={{ color: "text.disabled", lineHeight: 1.5 }}>
        Images sourced from Reddit. Tap squares to reroll. PDFs render at 800px for crisp prints.
      </Typography>
    </Box>
  );
}
