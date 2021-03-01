import React from "react";
import "./App.css";
import Header from "./components/Header";
import { ThemeProvider } from "@material-ui/styles";
import { theme } from "./theme/customTheme";
import Home from "./components/Home";

function App() {
  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <Header />
        <Home />
      </ThemeProvider>
    </React.Fragment>
  );
}

export default App;
