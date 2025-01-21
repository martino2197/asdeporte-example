import { createTheme } from "@mui/material/styles";
import { toggleButtonClasses } from "@mui/material";

declare module "@mui/material/styles" {
  interface TypographyVariants {
    t1text: React.CSSProperties;
  }
  interface TypographyVariantsOptions {
    t1text?: React.CSSProperties;
  }
}

declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    t1text: true;
  }
}

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#ff6a00",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#006064",
      contrastText: "#ffffff",
    },
    error: {
      main: "#d32f2f",
    },
    warning: {
      main: "#ff9800",
    },
    info: {
      main: "#0288d1",
    },
    success: {
      main: "#2e7d32",
    },
    background: {
      default: "#fafafa",
      paper: "#ffffff",
    },
  },
  typography: {
    fontFamily: ["Roboto", "Helvetica", "Arial", "sans-serif"].join(","),
    t1text: {
      fontSize: 13,
      fontFamily: "Roboto",
    },
  },
  components: {
    MuiButton: {
      defaultProps: {
        variant: "contained",
      },
      variants: [
        {
          props: { variant: "text" },
          style: {
            textTransform: "none",
            fontWeight: 500,
            borderRadius: 8,
          },
        },
        {
          props: { variant: "contained" },
          style: {
            textTransform: "none",
            fontWeight: 500,
            borderRadius: 8,
            boxShadow: "0px 2px 4px rgba(0,0,0,0.15)",
          },
        },
        {
          props: { variant: "outlined" },
          style: {
            textTransform: "none",
            fontWeight: 500,
            borderRadius: 8,
          },
        },
      ],
      styleOverrides: {
        sizeMedium: {
          fontSize: "14px",
          padding: "8px 20px",
          minHeight: 40,
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: "outlined",
        size: "small",
      },
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontSize: 14,
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          "&:focus-within fieldset, &:focus-visible fieldset": {
            border: "1px solid #C3C3C3",
          },
        },
      },
    },
    MuiToggleButton: {
      styleOverrides: {
        root: {
          backgroundColor: "white",
          textTransform: "none",
          borderRadius: 8,
          color: "#ff6a00",
          [`&.${toggleButtonClasses.selected}`]: {
            backgroundColor: "#fff2e6",
            color: "#ff6a00",
            "&:hover": {
              backgroundColor: "#ffe6cc",
            },
          },
          "&:hover": {
            backgroundColor: "#fff2e6",
          },
        },
      },
    },
  },
});

export default theme;
