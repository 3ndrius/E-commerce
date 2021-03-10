import React, {lazy, Suspense } from "react";
import { Route } from 'react-router-dom'
import { ThemeProvider } from "@material-ui/styles";
import { theme } from "./theme/customTheme";
import { requestLoadUser, clearErrors } from './actions/userActions'
import store from './store'
import { useDispatch, useSelector } from 'react-redux';
import ProtectedRoute from "./components/route/ProtectedRoute"
import Header from "./components/layout/Header";
const Home = (lazy(() => (import('./components/Home'))))
const ProductDetail = (lazy(() => (import('./components/ProductDetails'))))
const Login = (lazy(() => (import('./components/Login'))))
const Register = (lazy(() => (import('./components/Register'))))
const  Profile= (lazy(() => (import('./components/Profile'))))
const ProfileUpdate = (lazy(() => (import('./components/UpdateProfile'))))
const UpdatePassword = (lazy(() => (import('./components/UpdatePassword'))))

function App() {
  const dispatch = useDispatch();
  React.useEffect(() => {
    store.dispatch(requestLoadUser())
  },[dispatch])
  return (
      <ThemeProvider theme={theme}>
        <Header />
        <Suspense fallback>
        <Route path="/" exact component={Home} />
        <Route path="/search/:keyword" component={Home} />
        <Route path="/product/:id" component={ProductDetail} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <ProtectedRoute path="/profile" component={Profile} exact/>
        <ProtectedRoute path="/profile/update" component={ProfileUpdate} exact />
        <ProtectedRoute path="/profile/password" component={UpdatePassword} exact />
        </Suspense>
      </ThemeProvider>
 
  );
}

export default App;
