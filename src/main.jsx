import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { UserProvider } from "./contexts/UserContext.jsx";
import { MobileProvider } from "./contexts/MobileContext.jsx";
import { BrowserRouter } from "react-router-dom";
import { Amplify } from "aws-amplify";
import config from "./amplifyconfiguration.json";
Amplify.configure(config);
import "@aws-amplify/ui-react/styles.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { purple } from "@mui/material/colors";
const theme = createTheme({
  palette: {
    primary: {
      main: purple[300], // A lighter shade of purple
      light: purple[100], // Even lighter
      dark: purple[400], // A bit darker than the main color
      contrastText: "#fff", // White text will offer a good contrast
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <MobileProvider>
          <ThemeProvider theme={theme}>
            <App />
          </ThemeProvider>
        </MobileProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);
