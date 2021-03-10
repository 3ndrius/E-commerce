// store
import createSagaMiddleware from "redux-saga";
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension'
// imports
import rootSaga from "./sagas";
import { singleProductReducer, productReducer } from './reducers/productReducers'
import { authReducer, userReducer, forgotPasswordReducer } from './reducers/userReducres';
import { cartReducer } from './reducers/cartReducers'
const reducer = combineReducers({
  products: productReducer,
  product: singleProductReducer,
  auth: authReducer,
  user: userReducer,
  forgotPassword: forgotPasswordReducer,
  cart: cartReducer
});

const sagaMiddleware = createSagaMiddleware();
const initState = {
  cart: {
    cartItems: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []
  }
};
const composedEnhancer = composeWithDevTools(applyMiddleware(sagaMiddleware))

const store = createStore(
  reducer,
  initState,
  composedEnhancer
);

sagaMiddleware.run(rootSaga); //saga

export default store;
