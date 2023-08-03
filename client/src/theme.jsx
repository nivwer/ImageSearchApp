import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#000000',
      contrastText: '#c4c4c4',
      light: '#121212',
      dark: '#121212',
    },
    secondary: {
      main: '#101010',
      contrastText: '#c7c7c7',
      dark: '#232323',
      light: '#232323',
    },
    text: {
      primary: 'rgba(185,185,185,0.87)',
      secondary: 'rgba(154,154,154,0.54)',
      disabled: 'rgba(100,100,100,0.38)',
      hint: 'rgba(88,88,88,0.38)',
    },
    background: {
      default: '#000000',
      paper: '#000000',
      primary: '#060606'
    },
    error: {
      main: '#5a4543',
      dark: '#5a4543',
      light: '#5a4543',
      contrastText: '#c4c4c4',
    },
    warning: {
      main: '#71644e',
    },
    info: {
      main: '#36414a',
    },
    success: {
      main: '#4d5e4d',
    },
    divider: 'rgba(160,160,160,0.12)',
  },
  typography: {
    fontFamily: [
      'IM Fell English',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    fontSize: 14,
  },
});

export default theme;
