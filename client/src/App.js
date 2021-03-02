import React from "react";
import { BrowserRouter, Route } from 'react-router-dom'
import { ThemeProvider } from "@material-ui/styles";
import { theme } from "./theme/customTheme";
import Header from "./components/layout/Header";
import Home from "./components/Home";


function App() {
  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
        <Header />
        <Route path="/" component={Home} />
        </BrowserRouter>
      </ThemeProvider>
    </React.Fragment>
  );
}

export default App;
