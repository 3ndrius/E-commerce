// store
import createSagaMiddleware from "redux-saga";
import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
// imports
import rootSaga from "./sagas";
import {
  singleProductReducer,
  productReducer,
  submitReviewReducer,
} from "./reducers/productReducers";
import {
  authReducer,
  userReducer,
  forgotPasswordReducer,
} from "./reducers/userReducres";
import { cartReducer } from "./reducers/cartReducers";
import {
  newOrderReducer,
  myOrderReducer,
  orderDetailsReducer,
} from "./reducers/orderReducers";

const reducer = combineReducers({
  products: productReducer,
  product: singleProductReducer,
  auth: authReducer,
  user: userReducer,
  forgotPassword: forgotPasswordReducer,
  cart: cartReducer,
  newOrder: newOrderReducer,
  myOrder: myOrderReducer,
  singleOrder: orderDetailsReducer,
  submitReview: submitReviewReducer,
});

const sagaMiddleware = createSagaMiddleware();
const initState = {
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    shippingInfo: localStorage.getItem("shippingInfo")
      ? JSON.parse(localStorage.getItem("shippingInfo"))
      : {},
  },
};
const composedEnhancer = composeWithDevTools(applyMiddleware(sagaMiddleware));

const store = createStore(reducer, initState, composedEnhancer);

sagaMiddleware.run(rootSaga); //saga

export default store;
