import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#000000",
      dark: "#373737",
      contrastText: "#c4c4c4",
      light: "#000000",
    },
    secondary: {
      main: "#414141",
      contrastText: "#c7c7c7",
      dark: "#333333",
    },
    text: {
      primary: "rgba(185,185,185,0.87)",
      secondary: "rgba(154,154,154,0.54)",
      disabled: "rgba(80,80,80,0.38)",
      hint: "rgba(88,88,88,0.38)",
    },
    background: {
      default: "#000000",
      paper: "#000000",
    },
  },
});

export default theme;
