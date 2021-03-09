// store
import createSagaMiddleware from "redux-saga";
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension'
// imports
import rootSaga from "./sagas";
import { singleProductReducer, productReducer } from './reducers/productReducers'
import { authReducer, userReducer } from './reducers/userReducres'
const reducer = combineReducers({
  products: productReducer,
  product: singleProductReducer,
  auth: authReducer,
  user: userReducer
});

const sagaMiddleware = createSagaMiddleware();
const initState = {};
const composedEnhancer = composeWithDevTools(applyMiddleware(sagaMiddleware))

const store = createStore(
  reducer,
  initState,
  composedEnhancer
);

sagaMiddleware.run(rootSaga); //saga

export default store;
