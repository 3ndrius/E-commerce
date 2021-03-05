import React, {lazy, Suspense } from "react";
import { Route } from 'react-router-dom'
import { ThemeProvider } from "@material-ui/styles";
import { theme } from "./theme/customTheme";
import Header from "./components/layout/Header";
const Home = (lazy(() => (import('./components/Home'))))
const ProductDetail = (lazy(() => (import('./components/ProductDetails'))))
const Login = (lazy(() => (import('./components/Login'))))
const Register = (lazy(() => (import('./components/Register'))))

function App() {
  return (
      <ThemeProvider theme={theme}>
        <Header />
        <Suspense fallback>
        <Route path="/" exact component={Home} />
        <Route path="/search/:keyword" component={Home} />
        <Route path="/product/:id" component={ProductDetail} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        </Suspense>
      </ThemeProvider>
 
  );
}

export default App;
