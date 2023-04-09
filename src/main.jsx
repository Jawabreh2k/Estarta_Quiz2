import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import store from "./Redux/store";
import { Provider } from "react-redux";
import { createTheme, ThemeProvider } from "@mui/material";
const theme = createTheme({
  typography: {
    button: {
      textTransform: "none",
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
