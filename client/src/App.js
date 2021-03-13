import React, { lazy, Suspense } from "react";
import { Route } from "react-router-dom";
import { ThemeProvider } from "@material-ui/styles";
import { theme } from "./theme/customTheme";
import { requestLoadUser, clearErrors } from "./actions/userActions";
import store from "./store";
import ProtectedRoute from "./components/route/ProtectedRoute";
import Header from "./components/layout/Header";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const Home = lazy(() => import("./components/Home"));
const ProductDetail = lazy(() => import("./components/ProductDetails"));
const Login = lazy(() => import("./components/Login"));
const Register = lazy(() => import("./components/Register"));
const Profile = lazy(() => import("./components/Profile"));
const ProfileUpdate = lazy(() => import("./components/UpdateProfile"));
const UpdatePassword = lazy(() => import("./components/UpdatePassword"));
const PasswordForgot = lazy(() => import("./components/PasswordForgot"));
const PasswordReset = lazy(() => import("./components/PasswordReset"));
const Cart = lazy(() => import("./components/Cart"));
const Shipping = lazy(() => import("./components/Shipping"));
const Confirm = lazy(() => import("./components/Confirm"));
const Payment = lazy(() => import("./components/Payment"));
const OrderSuccess = lazy(() => import("./components/OrderSuccess"));
const showOrders = lazy(() => import("./components/showOrders"));

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_API_KEY);

function App() {
  
  React.useEffect(() => {
    store.dispatch(requestLoadUser());
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Header />
      <Suspense fallback>
        <Route path="/" exact component={Home} />
        <Route path="/search/:keyword" component={Home} />
        <Route path="/product/:id" component={ProductDetail} />
        <Route path="/login" component={Login} />
        <Route path="/forgot/password" component={PasswordForgot} exact />
        <Route path="/register" component={Register} />
        <Route path="/password/reset/:token" component={PasswordReset} exact />
        <Route path="/cart" component={Cart} />
        <ProtectedRoute path="/profile" component={Profile} exact />
        <Elements stripe={stripePromise}>
          <ProtectedRoute path="/payment" component={Payment} exact />
        </Elements>
        <ProtectedRoute path="/confirm" component={Confirm} exact />
        <ProtectedRoute path="/orders" component={showOrders} exact />
        <ProtectedRoute path="/success" component={OrderSuccess} exact />
        <ProtectedRoute path="/shipping" component={Shipping} exact />
        <ProtectedRoute path="/profile/update" component={ProfileUpdate} exact/>
        <ProtectedRoute path="/profile/password" component={UpdatePassword} exact />
      </Suspense>
    </ThemeProvider>
  );
}

export default App;
