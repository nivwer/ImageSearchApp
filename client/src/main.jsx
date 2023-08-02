import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

import '@fontsource/im-fell-english';
import '@fontsource/im-fell-english/400-italic.css';

import "./styles/index.css";
import { store } from "./app/store/rootReducer.jsx";
import { Provider } from "react-redux";
import { ThemeProvider } from "@mui/material";
import theme from './theme.jsx'

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
