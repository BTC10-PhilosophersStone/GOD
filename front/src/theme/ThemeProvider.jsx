import {
  CssBaseline,
  createTheme,
  GlobalStyles,
  ThemeProvider as MuiThemeProvider,
} from "@mui/material";

const appTheme = createTheme({
  palette: {
    mode: "light",
    common: {
      white: "#ffffff",
      black: "#000000",
    },
    primary: {
      main: "#466583",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#d4af37",
    },
    background: {
      default: "#ffffff",
      paper: "#ffffff",
    },
    text: {
      primary: "rgba(0, 0, 0, 1)",
      secondary: "rgba(0, 0, 0, 0.6)",
    },
    divider: "#ebebe7",
    action: {
      border: "rgba(0, 0, 0, 0.23)",
      hover: "rgba(0, 0, 0, 0.04)",
      selected: "rgba(0, 0, 0, 0.08)",
      disabled: "rgba(0, 0, 0, 0.38)",
      disabledBackground: "rgba(0, 0, 0, 0.12)",
      focus: "rgba(74, 144, 226, 0.24)",
    },
    custom: {
      libraryClickableLayer: "rgba(0, 0, 0, 0)",
      inputOutlinedEnabledBorder: "rgba(0, 0, 0, 0.23)",
      menuIcon: "#7a7a7a",
      accentGold: "#d4af37",
    },
  },
  typography: {
    fontFamily: '"Zen Kaku Gothic New", Helvetica, Arial, sans-serif',
    h1: {
      fontFamily: '"Hina Mincho", Helvetica, Arial, serif',
      fontWeight: 400,
      fontSize: "16px",
      lineHeight: "34px",
      letterSpacing: "5px",
    },
    body1: {
      fontFamily: '"Zen Kaku Gothic New", Helvetica, Arial, sans-serif',
      fontWeight: 400,
      fontSize: "16px",
      lineHeight: "24px",
      letterSpacing: "0.15px",
    },
    body2: {
      fontFamily: '"Zen Kaku Gothic New", Helvetica, Arial, sans-serif',
      fontWeight: 400,
      fontSize: "14px",
      lineHeight: "20px",
      letterSpacing: "0.15px",
    },
    button: {
      fontFamily: '"Zen Kaku Gothic New", Helvetica, Arial, sans-serif',
      fontWeight: 400,
      fontSize: "14px",
      lineHeight: "20px",
      letterSpacing: "0.15px",
      textTransform: "none",
    },
    subtitle1: {
      fontFamily: '"Zen Kaku Gothic New", Helvetica, Arial, sans-serif',
      fontWeight: 400,
      fontSize: "16px",
      lineHeight: "24px",
      letterSpacing: "0.15px",
    },
  },
  shape: {
    borderRadius: 8,
  },
  spacing: 4,
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        ":root": {
          "--libraryclickablelayer": "rgba(0, 0, 0, 0)",
          "--palette-components-input-outlined-enabledborder":
            "rgba(0, 0, 0, 0.23)",
          "--palette-text-secondary": "rgba(0, 0, 0, 0.6)",
        },
        '[data-palette-mode="light"]': {
          "--palette-components-input-outlined-enabledborder":
            "rgba(0, 0, 0, 0.23)",
          "--palette-text-secondary": "rgba(0, 0, 0, 0.6)",
        },
        '[data-palette-mode="dark"]': {
          "--palette-components-input-outlined-enabledborder":
            "rgba(255, 255, 255, 0.23)",
          "--palette-text-secondary": "rgba(255, 255, 255, 0.7)",
        },
        "html, body, #root": {
          minHeight: "100%",
        },
        body: {
          margin: 0,
          backgroundColor: "#ffffff",
          color: "rgba(0, 0, 0, 1)",
          WebkitFontSmoothing: "antialiased",
          MozOsxFontSmoothing: "grayscale",
        },
        "*, *::before, *::after": {
          boxSizing: "border-box",
        },
        a: {
          textDecoration: "none",
          color: "inherit",
        },
        "button:focus-visible": {
          outline: "2px solid #4a90e2",
          outlineOffset: "2px",
        },
        img: {
          maxWidth: "none",
          height: "auto",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: 8,
          boxShadow: "none",
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: 8,
          backgroundColor: theme.palette.common.white,
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: theme.palette.action.border,
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: theme.palette.text.secondary,
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: theme.palette.primary.main,
            borderWidth: 1,
          },
          "& input::placeholder": {
            color: theme.palette.text.secondary,
            opacity: 1,
          },
        }),
        input: ({ theme }) => ({
          ...theme.typography.body1,
          paddingTop: 16,
          paddingBottom: 16,
        }),
      },
    },
  },
});

export const ThemeProvider = ({ children }) => {
  return (
    <MuiThemeProvider theme={appTheme}>
      <CssBaseline />
      <GlobalStyles
        styles={{
          '@import url("https://fonts.googleapis.com/css?family=Hina+Mincho:400|Zen+Kaku+Gothic+New:400")':
            {},
        }}
      />
      {children}
    </MuiThemeProvider>
  );
};

export default ThemeProvider;
