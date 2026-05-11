"use client";

import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#7c4dff",
      light: "#b388ff",
      dark: "#651fff",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#ff4081",
      light: "#ff79b0",
      dark: "#c60055",
      contrastText: "#ffffff",
    },
    background: {
      default: "#080b18",
      paper: "#0f1525",
    },
    text: {
      primary: "#e8eaf6",
      secondary: "#7e89a9",
    },
    success: {
      main: "#00e676",
      dark: "#00c853",
    },
    info: {
      main: "#00e5ff",
      dark: "#00b8d4",
    },
    warning: {
      main: "#ffab40",
      dark: "#ff9100",
    },
    error: {
      main: "#ff5252",
      dark: "#ff1744",
    },
    divider: "rgba(255, 255, 255, 0.06)",
  },
  typography: {
    fontFamily: 'var(--font-body), "Space Grotesk", sans-serif',
    h1: {
      fontFamily: 'var(--font-display), "Baloo 2", sans-serif',
      fontWeight: 800,
      letterSpacing: "-0.03em",
    },
    h2: {
      fontFamily: 'var(--font-display), "Baloo 2", sans-serif',
      fontWeight: 800,
      letterSpacing: "-0.02em",
    },
    h3: {
      fontFamily: 'var(--font-display), "Baloo 2", sans-serif',
      fontWeight: 700,
    },
    h4: {
      fontFamily: 'var(--font-display), "Baloo 2", sans-serif',
      fontWeight: 800,
      letterSpacing: "-0.02em",
    },
    h5: {
      fontFamily: 'var(--font-display), "Baloo 2", sans-serif',
      fontWeight: 700,
    },
    h6: {
      fontFamily: 'var(--font-display), "Baloo 2", sans-serif',
      fontWeight: 700,
    },
    subtitle1: {
      fontWeight: 600,
    },
    subtitle2: {
      fontWeight: 600,
    },
    button: {
      fontWeight: 700,
      letterSpacing: "0.02em",
    },
    overline: {
      fontWeight: 700,
      letterSpacing: "0.12em",
      fontSize: "0.7rem",
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: "#080b18",
          "&::-webkit-scrollbar": {
            width: 8,
          },
          "&::-webkit-scrollbar-track": {
            background: "transparent",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "rgba(124, 77, 255, 0.3)",
            borderRadius: 4,
          },
        },
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 700,
          borderRadius: 12,
          padding: "10px 24px",
          transition: "all 0.2s ease",
        },
        containedPrimary: {
          background: "linear-gradient(135deg, #7c4dff 0%, #448aff 100%)",
          boxShadow: "0 4px 20px rgba(124, 77, 255, 0.35)",
          "&:hover": {
            background: "linear-gradient(135deg, #651fff 0%, #2979ff 100%)",
            boxShadow: "0 6px 30px rgba(124, 77, 255, 0.5)",
            transform: "translateY(-1px)",
          },
          "&:active": {
            transform: "translateY(0)",
          },
        },
        containedSecondary: {
          background: "linear-gradient(135deg, #ff4081 0%, #ff6e40 100%)",
          boxShadow: "0 4px 20px rgba(255, 64, 129, 0.35)",
          "&:hover": {
            background: "linear-gradient(135deg, #f50057 0%, #ff3d00 100%)",
            boxShadow: "0 6px 30px rgba(255, 64, 129, 0.5)",
            transform: "translateY(-1px)",
          },
        },
        outlined: {
          borderColor: "rgba(124, 77, 255, 0.4)",
          color: "#b388ff",
          "&:hover": {
            borderColor: "#7c4dff",
            backgroundColor: "rgba(124, 77, 255, 0.08)",
            transform: "translateY(-1px)",
          },
        },
      },
    },
    MuiPaper: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: {
          backgroundImage: "none",
          border: "1px solid rgba(255, 255, 255, 0.06)",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "rgba(255, 255, 255, 0.1)",
            transition: "border-color 0.2s ease",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "rgba(124, 77, 255, 0.4)",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#7c4dff",
          },
        },
      },
    },
    MuiToggleButtonGroup: {
      styleOverrides: {
        root: {
          backgroundColor: "rgba(255, 255, 255, 0.03)",
          borderRadius: 10,
          border: "1px solid rgba(255, 255, 255, 0.06)",
          padding: 3,
          gap: 3,
          "& .MuiToggleButtonGroup-grouped": {
            border: "none",
            borderRadius: "8px !important",
            margin: 0,
          },
        },
      },
    },
    MuiToggleButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 700,
          color: "rgba(255, 255, 255, 0.4)",
          padding: "6px 16px",
          transition: "all 0.2s ease",
          "&.Mui-selected": {
            backgroundColor: "rgba(124, 77, 255, 0.2)",
            color: "#b388ff",
            "&:hover": {
              backgroundColor: "rgba(124, 77, 255, 0.3)",
            },
          },
          "&:hover": {
            backgroundColor: "rgba(255, 255, 255, 0.05)",
          },
        },
      },
    },
    MuiTooltip: {
      defaultProps: {
        arrow: true,
      },
      styleOverrides: {
        tooltip: {
          backgroundColor: "#1a2040",
          border: "1px solid rgba(124, 77, 255, 0.2)",
          borderRadius: 8,
          fontSize: "0.78rem",
          fontWeight: 500,
          padding: "6px 12px",
        },
        arrow: {
          color: "#1a2040",
          "&::before": {
            border: "1px solid rgba(124, 77, 255, 0.2)",
          },
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: "rgba(255, 255, 255, 0.06)",
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 600,
          borderRadius: 8,
        },
        filled: {
          backgroundColor: "rgba(124, 77, 255, 0.15)",
          color: "#b388ff",
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        icon: {
          color: "rgba(255, 255, 255, 0.4)",
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          margin: "2px 6px",
          transition: "background-color 0.15s ease",
          "&:hover": {
            backgroundColor: "rgba(124, 77, 255, 0.1)",
          },
          "&.Mui-selected": {
            backgroundColor: "rgba(124, 77, 255, 0.15)",
            "&:hover": {
              backgroundColor: "rgba(124, 77, 255, 0.2)",
            },
          },
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
        standardError: {
          backgroundColor: "rgba(255, 82, 82, 0.1)",
          border: "1px solid rgba(255, 82, 82, 0.2)",
          color: "#ff8a80",
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          backgroundColor: "rgba(124, 77, 255, 0.1)",
        },
        bar: {
          borderRadius: 4,
          background: "linear-gradient(90deg, #7c4dff, #448aff)",
        },
      },
    },
    MuiBadge: {
      styleOverrides: {
        badge: {
          fontWeight: 700,
          fontSize: "0.7rem",
        },
      },
    },
  },
});

export default theme;
