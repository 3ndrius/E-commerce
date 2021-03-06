import React, {lazy, Suspense } from "react";
import { Route } from 'react-router-dom'
import { ThemeProvider } from "@material-ui/styles";
import { theme } from "./theme/customTheme";
import { requestLoadUser } from './actions/userActions'
import store from './store'
import { useDispatch, useSelector } from 'react-redux';
import Header from "./components/layout/Header";
const Home = (lazy(() => (import('./components/Home'))))
const ProductDetail = (lazy(() => (import('./components/ProductDetails'))))
const Login = (lazy(() => (import('./components/Login'))))
const Register = (lazy(() => (import('./components/Register'))))
function App() {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector(state => state.auth);

  React.useEffect(() => {
    // dispatch(requestLoadUser());
    store.dispatch(requestLoadUser())
  },[])
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
